// Ant Design theme token overrides, aligned with the Tailwind
// tokens in src/index.css so antd controls sit naturally inside
// Tailwind-built layouts.
const antdTheme = {
    token: {
        colorPrimary: '#01a0fe',
        colorInfo: '#01a0fe',
        colorSuccess: '#22c55e',
        colorWarning: '#f59e0b',
        colorError: '#ef4444',
        colorTextBase: '#1e293b',
        colorBorder: '#e6ecf4',
        borderRadius: 10,
        fontFamily:
            "'Inter', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
        fontSize: 14,
        controlHeight: 42,
    },
    components: {
        Button: {
            fontWeight: 600,
            primaryShadow: '0 12px 28px -12px rgba(1,160,254,0.9)',
        },
        Input: {
            paddingBlock: 9,
        },
        Collapse: {
            headerPadding: '18px 0',
            contentPadding: '0 0 18px',
        },
        Drawer: {
            paddingLG: 20,
        },
    },
};

export default antdTheme;
