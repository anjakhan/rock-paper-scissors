// Game Items
const items = [
    {
        id: 0,
        name: 'rock',
        color: 'hsl(349, 71%, 52%)'
    },{
        id: 1,
        name: 'paper',
        color: 'hsl(230, 89%, 62%)'
    },{
        id: 2,
        name: 'scissors',
        color: 'hsl(39, 89%, 49%)'
    }
];

const game = document.querySelector('.game');
const triangle = document.querySelector('.triangle');
const playerBtn = document.getElementById('player');
const houseBtn = document.getElementById('house');
const playerImg = document.getElementById('playerImg');
const playAgain = document.querySelector('.playAgain');
const houseImg = document.getElementById('houseImg');
const winner = document.querySelector('.winner');
const scoreText = document.getElementById('scoreText');
let score = 0;

// generate House selection
const generateHouseItem = () => {
	const getRandomId = () => Math.floor(Math.random() * 3) + 0;
	let i = getRandomId();
	const shadowHouse = `inset 0px 5px 0px 0px #ccc, 0px 6px 0px 0px ${items[i].color}, 0px 0px 0px 30px rgba(255,255,255,0.06), 0px 0px 0px 60px rgba(255,255,255,0.03), 0px 0px 0px 100px rgba(255,255,255,0.01)`;

	function getRandomItem() {
		houseImg.src = `images/icon-${items[getRandomId()].name}.svg`;
	}
	let timer = setInterval(() => getRandomItem(), 100);
	setTimeout(function() {
		clearInterval(timer);
		houseBtn.classList.remove('plainBtn');
		houseBtn.classList.add(items[i].name);
		houseImg.src = `images/icon-${items[i].name}.svg`;	
	}, 1600);
	localStorage.setItem('houseId', i);
	localStorage.setItem('shadowHouse', shadowHouse);
}

// Play game
items.map(( { name, color, id } ) => {
	const choice = document.getElementById(name);
	const shadow = `inset 0px 5px 0px 0px #ccc, 0px 6px 0px 0px ${color}, 0px 0px 0px 30px rgba(255,255,255,0.06), 0px 0px 0px 60px rgba(255,255,255,0.03), 0px 0px 0px 100px rgba(255,255,255,0.01)`;
	let result = ''

	choice.addEventListener('click', function() {
		triangle.style.display = 'none';
		game.style.display = 'flex';
		playerBtn.classList.add('btn', 'playerBtn', name);
		playerImg.src = `images/icon-${name}.svg`;

		generateHouseItem();
		const houseId = localStorage.getItem('houseId');
		const shadowHouse = localStorage.getItem('shadowHouse');

		if (id == houseId) {
			score;
			result = "Tie";
		} else if (id == houseId+1) {
			score++;
			result = "you win";
			setTimeout(function() {
				playerBtn.style.boxShadow = shadow;
			}, 2000);
		} else if (id == 2 && houseId == 1) {
			score++;
			result = "you win";
			setTimeout(function() {
				playerBtn.style.boxShadow = shadow;
			}, 2000);
		} else if (id == 0 && houseId == 2) {
			score++;
			result = "you win";
			setTimeout(function() {
				playerBtn.style.boxShadow = shadow;
			}, 2000);
		} else {
			score--;
			result = "you lose";
			setTimeout(function() {
				houseBtn.style.boxShadow = shadowHouse;
			}, 2000);
		}

		if (score < 0) {
			score = 0
		}

		setTimeout(function() {
			scoreText.innerText = score;
			resultText.innerText = result;
			winner.style.display = 'block';
		}, 2000);
	});
	return 
});

playAgain.onclick = function() {
		triangle.style.display = 'block';
		game.style.display = 'none';
		winner.style.display = 'none';
		playerBtn.classList = '';
		houseBtn.classList = 'btn houseBtn plainBtn';
		playerBtn.style.boxShadow = '';
		houseBtn.style.boxShadow = '';
	}

// Rules Modal
var modal = document.getElementById("rulesModal");
var btn = document.getElementById("rulesBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}