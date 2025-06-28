import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';
import { useCallback } from 'react';

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Выберите...'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOrFocusOutside = (e) => {
      const target = e.target || e.relatedTarget;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOrFocusOutside);
    document.addEventListener('focusin', handleClickOrFocusOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOrFocusOutside);
      document.removeEventListener('focusin', handleClickOrFocusOutside);
    };
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen && selected) {
      const index = options.findIndex((opt) => opt.value === value);
      setActiveIndex(index);
    }
  }, [isOpen, options, selected, value]);

  const handleSelect = useCallback(
    (val) => {
      onChange(val);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onChange]
  );

  const reset = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen && (e.key === 'Enter' || e.key === 'ArrowDown')) {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);

        return;
      }

      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % options.length);
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(
            (prev) => (prev - 1 + options.length) % options.length
          );
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          const item = options[activeIndex];
          if (item) handleSelect(item.value);
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }
    },
    [activeIndex, handleSelect, isOpen, options]
  );

  const resetByKey = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        reset(e);
      }
    },
    [reset]
  );

  const handleOptionClick = (val) => () => {
    handleSelect(val);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Selector
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="custom-select-list"
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? `option-${activeIndex}` : undefined
        }
      >
        <DisplayValue isPlaceholder={!selected}>
          {selected?.label || placeholder}
        </DisplayValue>
        {value ? (
          <Cross
            onClick={reset}
            onKeyDown={resetByKey}
            tabIndex={0}
            role="button"
            aria-label="Очистить выбор"
          >
            <CrossIcon />
          </Cross>
        ) : (
          <Arrow isOpen={isOpen}>
            <ArrowIcon />
          </Arrow>
        )}
      </Selector>

      {isOpen && (
        <Dropdown role="listbox" id="custom-select-list" ref={listRef}>
          {options.map((option, index) => (
            <Option
              key={option.value}
              ref={(el) => (optionRefs.current[index] = el)}
              onClick={handleOptionClick(option.value)}
              role="option"
              id={`option-${index}`}
              aria-selected={option.value === value}
              isActive={index === activeIndex}
            >
              {option.label}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  font-family: sans-serif;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  height: 40px;
  border: 1px solid #83bf46;
  border-radius: 6px;
  background: #263750;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease;

  &:hover {
    background: #334466;
  }

  &:focus-visible {
    outline: 2px solid #83bf46;
    outline-offset: 2px;
  }
`;

const DisplayValue = styled.span`
  font-size: 14px;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#B3B3B3' : 'white')};
`;

const Arrow = styled.span`
  display: flex;
  margin-left: auto;
  font-size: 12px;
  color: #999;
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'none')};
`;

const Cross = styled.span`
  display: flex;
  margin-left: auto;
  font-size: 12px;
  color: #999;

  &:hover path {
    stroke: #83bf46;
  }

  &:focus-visible {
    outline: 1px solid #83bf46;
    border-radius: 4px;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  max-height: 155px;
  top: 45px;
  left: 0;
  right: 0;
  background: white;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
  list-style: none;
  z-index: 1000;
  overflow-y: auto;

  scrollbar-width: 4px;
  scrollbar-color: #d9d9d9;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    margin: 4px 0;
  }
`;

const Option = styled.li`
  padding: 4px 8px;
  cursor: pointer;
  line-height: 22px;
  font-size: 14px;
  background: ${({ isActive }) => (isActive ? '#83bf4633' : 'transparent')};

  &:hover {
    background: #83bf4633;
  }
`;
