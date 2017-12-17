var Engine;
var engine;
function addObj(){
	//物体を追加する
	for (var i = 0; i < 3; i++) {
		var rnd = parseInt(Math.random() * 10);
		var x = 320 + rnd * 10;
		var y = 0 - rnd * 120;
		rnd2 = parseInt(Math.random() * 640);
		var x2 = rnd2;
		var y2 = 0 - rnd2 * 2;
		var path = 'images/zako.png';
		var rnd2 = parseInt(Math.random() * 3);
		if(rnd2==0){
			path = 'images/zako.png';
		}else if(rnd2==1){
			path = 'images/pasuta.png';
		}else{
			path = 'images/ukiwa.png';
		}
		World.add(engine.world, [
			/*
			Bodies.circle(x, y, 60, { //ボールを追加
				density: 0.0005, // 密度: 単位面積あたりの質量
				frictionAir: 0.06, // 空気抵抗(空気摩擦)
				restitution: 1, // 弾力性
				friction: 0.01, // 本体の摩擦
				render: { //ボールのレンダリングの設定
					sprite: { //スプライトの設定
						texture: './ball.png' //スプライトに使うテクスチャ画像を指定
					}
				},
				timeScale: 1.5 //時間の倍率を設定(1で1倍速)
			}),
			*/

			Bodies.rectangle(x2 , y2, 150, 150, { //長方形を追加する
				render: {
					sprite: { //スプライトの設定
						texture: path //スプライトに使うテクスチャ画像を指定
					}
				}
			})
		]);
	}

}
(function(){
	
	//Matter.js モジュール 初期設定
	Engine = Matter.Engine, //物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
		World = Matter.World, //物理演算領域の作成・操作するメソッドを含む
		Body = Matter.Body, //剛体のモデルを作成・操作するメソッドを含む
		Bodies = Matter.Bodies, //一般的な剛体モデルを作成するメソッドを含む
		Constraint = Matter.Constraint, //制約を作成・操作するメソッドを含む
		Composites = Matter.Composites,
		Common = Matter.Common,
		Vertices = Matter.Vertices, //頂点のセットを作成・操作するメソッドを含む
		MouseConstraint = Matter.MouseConstraint; //マウスの制約を作成するためのメソッドが含む
			
	// Matter.jsのEngineを作成
	var container = document.getElementById('canvas-container');
	engine = Engine.create(container, {
		render: { //レンダリングの設定
			options: {
				wireframes: false, //ワイヤーフレームモードをoff
				width: 640, //canvasのwidth(横幅)
				height: 480, //canvasのheight(高さ)
				background: 'rgba(0, 0, 0, 0)'
			}
		}
	});
	
	// マウス操作を追加
	var mouseConstraint = MouseConstraint.create(engine);
	World.add(engine.world, mouseConstraint);
	
	//床を作る
	World.add(engine.world, [Bodies.rectangle(320, 460, 480, 20, {
		isStatic: true, //固定する
		render: {
			fillStyle: '#977559', // 塗りつぶす色: CSSの記述法で指定
			strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
			lineWidth: 0
		}
	})]);
	
	setInterval("addObj()",1000);
	
	// 物理シュミレーションを実行
	Engine.run(engine);
	
})();