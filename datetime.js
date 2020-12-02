const date = new Date
function datetime () {
    let Hours = date.getHours()
    switch (true){
            case (Hours >= 5) && (Hours <= 23):console.log('день');
            break;
            case (Hours >= 0) && (Hours < 5):console.log('ночь');
            break;
        }
        
}
datetime ()