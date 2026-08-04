import React from 'react';
import { ConfigProvider } from 'antd';
import antdTheme from './antdTheme';

/**
 * Applies the shared antd theme.
 *
 * Deliberately NOT mounted at the app root: antd is ~130 kB gzipped
 * and only three places on the site use it (the mobile menu drawer,
 * the FAQ accordion and the contact form). Each of those already
 * lives in a lazily-loaded chunk, so scoping the provider to them
 * keeps antd out of the entry bundle entirely — the landing page
 * never downloads it.
 *
 * If a fourth antd-using surface appears, wrap it in this rather
 * than hoisting the provider back to main.jsx.
 */
const AntdScope = ({ children }) => <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;

export default AntdScope;
