(function() {
  // 使用するメソッドを読み込む
  var Engine = Matter.Engine,
      Gui = Matter.Gui,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Common = Matter.Common,
      Constraint = Matter.Constraint,
      RenderPixi = Matter.RenderPixi,
      Events = Matter.Events,
      Bounds = Matter.Bounds,
      Vector = Matter.Vector,
      Vertices = Matter.Vertices,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

  var STAGE = {};
  var BALL = {};
  var _engine = {};
  var _ball = {};

  var roteteFlag = false;

  STAGE.init = function() {
    var opt = {
      positionIterations: 6,
      velocityIterations: 4,
      enableSleeping: false,
      render: { //レンダリングの設定 
        options: { 
          wireframes: false, //ワイヤーフレームモードをoff 
          width: 640, //canvasのwidth(横幅) 
          height: 480, //canvasのheight(高さ) 
          background: 'rgba(0, 0, 0, 0)' 
        } 
      } 
    };

    var mainStage = document.getElementById('stage');
    _engine = Engine.create(mainStage, opt);

    //Engine 実行
    Engine.run(_engine);
    STAGE.reset();

    STAGE.addBall(300, 100);

    var button = document.getElementById('button-firing');
    
    button.addEventListener('mousedown', function(e){
      roteteFlag = true;
    });

    button.addEventListener('mouseup', function(e){
      roteteFlag = false;
    });
  };

  STAGE.addBall = function(x, y) {
    var _world = _engine.world;
    _ball = BALL.create(x, y);
    World.add(_world, [_ball]);

    BALL.addEvent();

    BALL.tickEvent();
  };

  STAGE.reset = function () {
    var _world = _engine.world;

    //描画クリア
    World.clear(_world);
    Engine.clear(_engine);

    //重力値
    _engine.world.gravity.y = 1;

    var offset = 0;

    //矩形で枠線を作る(rectangle(x座標,y座標,横幅,縦幅,option))
    World.add(_world, [
        //Bodies.rectangle(400, 0, 800, 1, {isStatic: true}),
        //Bodies.rectangle(800, 300, 1, 600, {isStatic: true}),
        //Bodies.rectangle(0, 0, 1, 600, {isStatic: true}),
        Bodies.rectangle(400, 400, 400, 1, {isStatic: true})
    ]);
    //renderのオプション(各種renderのオプション)
    var renderOptions = _engine.render.options;
    renderOptions.wireframes = false;
  };

  /**
  * BALL methods
  */
  BALL.create = function(x, y) {
    var shape = {
      label: 'Shape Body',
      position: {
          x: x,
          y: y
      },
      isStatic: true,
      vertices: Vertices.fromPath('L0 90 L86 0 L147 53 L76 149'), 
      render: {
          fillStyle: "#234",
          sprite:{texture:'images/zako.png'}
      }
    };
    var ball = Body.create(Common.extend({}, shape))

    return ball;
  };

  var delayCount = 0;
  
  BALL.addEvent = function() {
    Events.on(_engine, 'mousedown', function(e) {
      Body.setStatic(_ball, false);
      delayCount = 30;
      //_ball = BALL.create(e);
      //World.add(_engine.world, [_ball]);
    });
  };

  BALL.tickEvent = function() {
    Events.on(_engine, 'tick', function(e) {
      if(roteteFlag){
        Body.rotate(_ball, 0.05);
      }
      if(delayCount > 0) {
        delayCount--;
      }
      if(!Body.getStatic(_ball) && Body.isStop(_ball) && delayCount == 0){
        STAGE.addBall(300, 100);
      }
    });
  };

  // 初期化
  STAGE.init();
})();