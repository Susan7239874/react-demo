import React from 'react';
import { useViewport } from '../utils/viewportContext';
const BasicLayout = ({ children }) => {
    const { width } = useViewport();
    const breakpoint = 760;
    return (
        <div>

            {/* 共享的布局部分 */}
            <nav>导航栏</nav>
            <header>页眉</header>
            {/* 嵌套子组件 */}
            {children}
            {/* 共享的布局部分 */}
            <footer>页脚</footer>
            {width < breakpoint ?  'a':'b' }
        </div>
    );
};

export default BasicLayout;