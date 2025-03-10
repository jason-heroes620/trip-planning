export const secondsToHms = (d: number) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
    return hDisplay + mDisplay;
};
