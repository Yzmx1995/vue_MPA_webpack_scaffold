/**
 * @desc this is a function that formats the date
 * @param date {date || number}
 * @param type {string} format
 */
function formatDate(date, type = 'yyyy.MM.dd') {
    // verify && handle date
    date = date instanceof Date ? date :
        typeof date === 'number' && date.toString().length === 13 ? new Date(date) :
            typeof date === 'number' && date.toString().length === 10 ? new Date(date * 1000) : undefined;
    if (!date) {
        return process.env.NODE_ENV !== 'production' ? '请输入日期或时间戳' : '';
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    switch (type) {
        case 'yyyy.MM.dd': {
            return `${year}.${formatNumber(month)}.${formatNumber(day)}`;
        }
        case 'yyyy-MM-dd': {
            return `${year}-${formatNumber(month)}-${formatNumber(day)}`;
        }
        case 'yyyy年MM月dd日': {
            return `${year}年${formatNumber(month)}月${formatNumber(day)}日`;
        }
        case 'yyyy.MM.dd hh:mm': {
            return `${year}.${formatNumber(month)}.${formatNumber(day)} ` +
                `${hour}:${minute}`;
        }
        case 'yyyy-MM-dd hh:mm': {
            return `${year}-${formatNumber(month)}-${formatNumber(day)} ` +
                `${hour}:${minute}`;
        }
        case 'yyyy年MM月dd日 hh:mm': {
            return `${year}年${formatNumber(month)}月${formatNumber(day)}日 ` +
                `${hour}:${minute}`;
        }
        case 'yyyy.MM.dd hh:mm:ss': {
            return `${year}.${formatNumber(month)}.${formatNumber(day)} ` +
                `${hour}:${minute}:${second}`;
        }
        case 'yyyy-MM-dd hh:mm:ss': {
            return `${year}-${formatNumber(month)}-${formatNumber(day)} ` +
                `${hour}:${minute}:${second}`;
        }
        case 'yyyy年MM月dd日 hh:mm:ss': {
            return `${year}年${formatNumber(month)}月${formatNumber(day)}日 ` +
                `${hour}:${minute}:${second}`;
        }
    };
}

/**
 * @desc add 0 for param
 * @param num {number}
 */
function formatNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

export { formatDate, formatNumber };