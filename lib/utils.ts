export function displayDuration(duration: any) {
    // console.log("duration", duration)
    if (duration === null) {
        return '';
    }
    let output = '';

    if (duration.years)
        output += duration.years + (duration.years === 1 ? ' year' : ' years');
    if (duration.years && duration.months)
        output += ', ';
    if (duration.months)
        output += duration.months + (duration.months === 1 ? ' month ' : ' months ');
    return output;
}
