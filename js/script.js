// constants
const COLORS = {
    '1': 'red',
    '-1': 'blue',
    'null': 'white'
}


// state variables
var board, turn, winner;

// cached element references
var msg = document.querySelector("h2");     // where we print messages
var squares = document.querySelectorAll("td div");

// event listeners
document.querySelector("button").addEventListener('click', init);
// if you put init() in the line above, the machine will immediately attempt to run init() as soon as it's read
// so that's why we only put the NAME of the function, so that we can reference it ON click. 
document.querySelector("table").addEventListener('click', handleClick);


// functions
init();

function init() {
    board = [null,null, null,
        null, null, null,
        null, null, null];
    turn = 1;
    winner = null;
    render(); 
}

function render(){
    board.forEach(function(square, idx){
        squares[idx].style.background = COLORS[square];
    });
    if(winner === 'T'){
        msg.innerHTML = `Tie game.`;
        // important to have the T if statement first because if you have if(winner) first,
        // it could be the case that winner === 'T' which would resolve to a truthy value,
        // thus allowing code we DON'T want to execute to execute. this would run into problems
        // where we call COLORS[winner] and if you pass in a 'T' (which is undefined in COLORS{})
        // you get an error
    } else if(winner){
        msg.innerHTML = `Congratulations! ${COLORS[winner].toUpperCase()} wins!`; // means we'll have to set winner as 1 or -1
    } else{
        msg.innerHTML = `${COLORS[turn].toUpperCase()}'s turn.`;
    } 
}

function handleClick(evt){
    let index = parseInt(evt.target.id.replace("sq",""));
    if(board[index]||winner) return;
    board[index] = turn;
    winner = getWinner();
    turn *= -1;
    render();

}

function getWinner(){
    if(turn*(board[0]+board[1]+board[2])===3) return board[0];
    if(turn*(board[3]+board[4]+board[5])===3) return board[3];
    if(turn*(board[6]+board[7]+board[8])===3) return board[6];
    if(turn*(board[0]+board[3]+board[6])===3) return board[0];
    if(turn*(board[1]+board[4]+board[7])===3) return board[1];
    if(turn*(board[2]+board[5]+board[8])===3) return board[2];
    if(turn*(board[0]+board[4]+board[8])===3) return board[0];
    if(turn*(board[2]+board[4]+board[6])===3) return board[2];
    // you can either multiply the sum of the 3 indices by the turn
    // or you can wrap the sum in Math.abs; both will give the same result
    if(board.includes(null)) return null;
    return 'T';
}