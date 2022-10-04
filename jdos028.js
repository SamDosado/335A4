

 
async function getLog(){
    console.log('Getting logs')
    const fetchpromise = fetch('https://cws.auckland.ac.nz/gas/api/GameLog');
    let completedLine = document.getElementById('completed')
    let playedLine = document.getElementById('played')
    let maxnum = 1;
    let minnum = Number.MAX_VALUE;
    let maxI
    let maxdate;
    let mindate;
    
    const streamPromise = fetchpromise.then((response) => response.json());
    await streamPromise.then((data) => {
        for (let i = 0; i < data.length; i++){
            let compPoints = completedLine.getAttribute('points');
            let playPoints = playedLine.getAttribute('points');
            let day = data[i]
            let played = 300 - day.played;
            // let date = new Date(day.date).getTime()
            if (i== 0){
                mindate=day.date;
            }
            maxdate = day.date;
            let completed = 300 - day.completed;
            let p1 = compPoints + ` ${(i + 1) * 10} ${completed} `
            let p2 = playPoints + ` ${(i + 1) * 10} ${played} `
            
            maxnum = Math.max(day.completed, day.played, maxnum);
            minnum = Math.min(day.completed, day.played, minnum);
            
            maxI = i
            // console.log(`${i} ${day.completed} ${day.played}`)
            completedLine.setAttribute('points', p1);
            playedLine.setAttribute('points', p2);
        }
    });
    // console.log('before set')
    // console.log(300 - maxnum);
    document.getElementById('rect').setAttribute('points',`10 ${300 - maxnum} 10 ${300-minnum}  ${(maxI+1) * 10} ${300-minnum}` );
    document.getElementById('t1').setAttribute('y', 330 - minnum)
    document.getElementById('t2').setAttribute('y',330 - minnum)
    document.getElementById('l1').setAttribute('y1', 325 - minnum)
    document.getElementById('l2').setAttribute('y1',325 - minnum)
    document.getElementById('l1').setAttribute('y2', 325 - minnum)
    document.getElementById('l2').setAttribute('y2',325 - minnum)
    document.getElementById('maxnum').setAttribute('y', 300 - maxnum)
    document.getElementById('minnum').setAttribute('y',300 - minnum)
    document.getElementById('maxnum').innerHTML = maxnum
    document.getElementById('minnum').innerHTML = minnum
    document.getElementById('datemin').setAttribute('y',315 - minnum)
    document.getElementById('datemax').setAttribute('y',315 - minnum)
    document.getElementById('datemin').setAttribute('x',0)
    document.getElementById('datemax').setAttribute('x', maxI * 10)
    document.getElementById('datemin').innerHTML = mindate
    document.getElementById('datemax').innerHTML = maxdate
}