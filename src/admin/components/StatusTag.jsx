import React from 'react';
import { Tag } from 'antd';
import { STATUS_META } from '../constants';

const StatusTag = ({ status }) => {
    const meta = STATUS_META[status] || { label: status, color: 'default' };
    return (
        <Tag color={meta.color} className="!m-0 !text-[11.5px]">
            {meta.label}
        </Tag>
    );
};

export default StatusTag;
