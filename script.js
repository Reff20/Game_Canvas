const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [chao]
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  pulo: 5,
  pula(){
    flappyBird.velocidade = - flappyBird.pulo
  },
  atualiza(){
    if(colisaoChao((flappyBird.y + 30), chao.y)){
      som_HIT.play()
      mudaParaTela(telas.INICIO)
      return;
    }
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
      flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  },
}

const messageGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha(){
    contexto.drawImage(
      sprites,
      messageGetReady.sX, messageGetReady.sY,
      messageGetReady.w, messageGetReady.h,
      messageGetReady.x, messageGetReady.y,
      messageGetReady.w, messageGetReady.h,
    )
  }
}

let telaAtiva = {};
function mudaParaTela(novaTela) {
  resetBird();
  telaAtiva = novaTela;
}

const telas = {
  INICIO: {
    desenha(){
      planoDeFundo.desenha();
      chao.desenha();
      messageGetReady.desenha();
      flappyBird.desenha();
    },
    click(){
      mudaParaTela(telas.JOGO)
    },
    atualiza(){

    }
  },
  JOGO: {
    desenha(){
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
    },
    click(){
      flappyBird.pula();
    },
    atualiza(){
      flappyBird.atualiza();
    }
  }
}

function colisaoChao(bird, block){
  if(bird >= block){
    return true;
  }else return false;
}

function resetBird(){
  flappyBird.spriteX = 0;
  flappyBird.spriteY = 0;
  flappyBird.x = 10;
  flappyBird.y = 50;
  flappyBird.gravidade = 0.25;
  flappyBird.velocidade = 0;
  flappyBird.pulo = 5
}


function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  requestAnimationFrame(loop);
}

addEventListener('click',()=>{
  if(telaAtiva.click){
    telaAtiva.click();
  }
})

mudaParaTela(telas.INICIO)
loop();