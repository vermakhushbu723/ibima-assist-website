// Compact antd theme for the admin panel: small type, tight controls,
// same brand blue as the public site (src/theme/antdTheme.js).
const adminTheme = {
    token: {
        colorPrimary: '#01a0fe',
        colorInfo: '#01a0fe',
        colorSuccess: '#16a34a',
        colorWarning: '#d97706',
        colorError: '#dc2626',
        colorTextBase: '#1e293b',
        colorBorder: '#e2e8f0',
        colorBorderSecondary: '#edf1f6',
        colorBgLayout: '#f4f7fb',
        borderRadius: 6,
        borderRadiusLG: 8,
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
        fontSize: 13,
        fontSizeSM: 12,
        controlHeight: 30,
        controlHeightSM: 26,
        controlHeightLG: 36,
    },
    components: {
        Layout: {
            siderBg: '#04142e',
            headerBg: '#ffffff',
            headerHeight: 52,
            headerPadding: '0 16px',
        },
        Menu: {
            darkItemBg: '#04142e',
            darkSubMenuItemBg: '#04142e',
            darkItemSelectedBg: '#01a0fe',
            itemHeight: 36,
            itemMarginInline: 8,
            groupTitleFontSize: 11,
        },
        Table: {
            cellPaddingBlockSM: 7,
            cellPaddingInlineSM: 10,
            headerBg: '#f8fafc',
            headerColor: '#475569',
            fontSize: 12.5,
        },
        Card: {
            paddingLG: 16,
            headerFontSize: 14,
            headerHeight: 44,
        },
        Button: { fontWeight: 500 },
        Descriptions: { labelBg: '#f8fafc' },
    },
};

export default adminTheme;
