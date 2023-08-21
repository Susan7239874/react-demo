import React from 'react';
const BasicLayout = ({ children }) => {
    return (
        <div>
            {/* 共享的布局部分 */}
            <nav>导航栏</nav>
            <header>页眉</header>
            {/* 嵌套子组件 */}
            {children}
            {/* 共享的布局部分 */}
            <footer>页脚</footer>
        </div>
    );
};

export default BasicLayout;