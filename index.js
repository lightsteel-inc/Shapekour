var game;
document.querySelector('#play-btn').addEventListener('click', ()=>{
    document.querySelector('#home').style.display = "none";
    document.querySelector('#game').style.display = "block";
    game = setInterval(levels[0], 30);
});

cnvs = document.querySelector('canvas');
yat = cnvs.getContext('2d');

function rect(x, y, width, height, color) {
    this.width = width || 50;
    this.height = height || 50;
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || 'black';
    this.stop = false;
    (this.refresh = ()=>{
        yat.save();
        yat.translate(this.x, this.y);
        yat.rotate(this.angle);
        yat.fillStyle = color;
        yat.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        yat.restore();
    }
    )();
    this.move = {
        x: (d)=>{
            if (!this.stop) {
                this.x += d
            }
        },
        y: (d)=>{
            if (!this.stop) {
                this.y += d
            }
        }
    }
}
var collision = (a,b)=>{
    if (a.x - a.width / 2 < b.x + b.width / 2 && a.x + a.width / 2 > b.x - b.width / 2 && a.y - a.height / 2 < b.y + b.height /
        2 && a.y + a.height / 2 > a.y - a.height / 2) 
    {
        return true;
    }
    return false;
}
    function triangle (x1,y1,x2,y2,x3,y3){
    this.p1x = p1x || 0;
    this.p2x = p2x || 0;
    this.p3x = p3x || 0;
this.p1y = p1y || 0;
this.p2y = p2y || 0;
this.p3y = p3y || 0;
    this.color = color || '#ce0606';
    
}
var player = new rect(25,25,25,25,'orange');
var ob = [
    new rect(100,180,100,25,'grey'), //moving rect
    new rect(0,50,150,20,'grey'), //top left
    new rect(700,420,1020,25,'grey'), //mid long
    new rect(110,400,20,200,'grey'), //left vertical
    new rect(185,382,20,100,'grey')//right vertical
];

var ground = new rect(0,500,1200,40,'grey');

var moveright = true;

var y_velocity = 0;

var key = {};

var canjump = true;

var canmove = {
    right: true,
    down: true,
    left: true
};

document.onkeydown = e=>key[e.key.toLowerCase()] = e.type = true;
document.onkeyup = e=>key[e.key.toLowerCase()] = false;
setInterval(()=>{
    if (key['d'] && canmove.right || key['arrowright'] && canmove.right) {
        player.move.x(3);
    }
    if (key['a'] && canmove.left || key['arrowleft'] && canmove.left) {
        player.move.x(-3);
    }
    if (key['w'] && canjump || key['arrowup'] && canjump) {
        canjump = false;
        y_velocity -= 15;
    }
}, 15);
var checkpnt = new rect(550,470,5,75,'green');
var levels = [()=>{

    yat.clearRect(0, 0, 600, 500);
    player.y += y_velocity;
    if (player.y >= cnvs.height - 32.5) {
        y_velocity = 0;
        canjump = true;
        player.y = cnvs.height - 32.5
    } else if (player.y <= 12.5) {
        player.y = 12.5;
        y_velocity += 1.5;
    } else {
        y_velocity += 1.5;
    }
    
    if (player.x <= 12.5) {
        player.x = 12.5
    }
    
    if (player.x >= cnvs.width - 12.5) {
        player.x = cnvs.width - 12.5
    }
    
    ob[0].x = (moveright) ? ob[0].x + 4 : ob[0].x - 4;
    if (ob[0].x >= cnvs.width - 50) {
        moveright = false
    } else if (ob[0].x <= 50) {
        moveright = true
    }
    player.refresh();
    checkpnt.refresh();
    ground.refresh();
    ob.forEach(x=>x.refresh());
}]























