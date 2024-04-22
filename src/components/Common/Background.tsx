import React from 'react';

/**
 * ヘッダーフッターがあるときの背景
 * タッチスクロールしたときに白が見えないように
 * @returns 背景
 */
const Background: React.VFC = () => {
  return (
    <div
      style={{
        zIndex: -1,
        position: 'fixed',
        top: '60px',
        bottom: '0px',
        left: 0,
        right: 0,
        backgroundColor: 'rgb(216, 216, 216)',
      }}
    ></div>
  );
};

export default Background;
