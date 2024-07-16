import React, { useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import css from './index.module.less';

interface T {
  word: string;
  start?: number;
  end?: number;
  style?: CSSStyleDeclaration;
}

const TypeWord = (props: T): JSX.Element => {
  const { start = 0, end = 0, word, style = {} } = props;
  const [title] = useState(word);
  const [index, setIndex] = useState(0);
  const len = title.length;

  useInterval(() => {
    setIndex(index + 1);
  }, 300);

  return (
    <h1 className={css['h1']} style={style}>
      {title.slice(end, index % len + start + 1)} <span className={css['my-cursor']}>|</span>
    </h1>
  );
};

export default TypeWord;
