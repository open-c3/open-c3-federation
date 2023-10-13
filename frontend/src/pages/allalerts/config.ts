import { IFilterOption } from '@/models/alert.interface';

export const ALERT_LEVEL_OPTION: IFilterOption[] = [
    { text: '全部', value: '' },
    { text: 'level1', value: 'level1' },
    { text: 'level2', value: 'level2' },
    { text: 'level3', value: 'level3' },
    { text: 'level4', value: 'level4' }
];

export const ALERT_STATUS_OPTION: IFilterOption[] = [
    { text: '全部告警', value: '' },
    { text: '已抑制告警', value: 'suppressed' },
    { text: '未抑制告警', value: 'active' }
];

export const ALERT_ALARM_TYPE_OPTION: IFilterOption[] = [
    { text: '全部', value: '' },
    { text: '未认领', value: 'unclaimed' },
    { text: '已认领', value: 'claimed' }
];

export const ALERT_LEVEL_COLOR_MAP = {
    '': '',
    level1: 'first-almost',
    level2: 'second-almost',
    level3: 'third-almost',
    level4: 'forth-almost'
};
