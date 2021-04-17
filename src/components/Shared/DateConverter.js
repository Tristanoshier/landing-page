let convertDate = (createdAt) => {
    let date = new Date(createdAt);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${month}/${day}/${year}`
}

export default convertDate;

