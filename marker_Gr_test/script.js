
//＊＊＊背景地図を設定＊＊＊
//地理院地図
var m_Chiriin = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
	attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>" });

//OpenStreetMap
var m_Osm = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' });

//地図を表示
var map = L.map('map', {
	center: [42.827639, 140.811768],  //中心位置を指定（この例は羊蹄山）
	zoom: 11,                         //デフォルトのズームレベルを指定
	zoomControl:true,　　             //ズームコントロールを表示・非表示
 	layers: [m_Chiriin] });


//背景レイヤの作成
var Map_BaseLayer = {
	"地理院地図　標準": m_Chiriin,
	"OpenStreetMap　標準": m_Osm };

//----羊蹄山にマーカーを山のアイコンで表示----
//独自マーカーを使用
var yamaIcon = L.icon({
 	iconUrl: './img/yama.gif',
 	iconSize: [50, 50],
	iconAnchor: [25, 25],       //アイコンの配置位置
	popupAnchor: [0, -20] });   //ポップアップの配置位置


//マーカーの表示
var Map_Marker = L.marker([42.827639, 140.811768], {
	icon: yamaIcon })  //アイコンを設定
	.addTo(map);


//ポップアップ表示
var comment = '羊蹄山';
	Map_Marker.bindPopup(comment).openPopup();

//---------------------------------------------


//Leaflet.Markerclusterをインポート
document.write("<script type='text/javascript' src='plugin/markercluster/dist/leaflet.markercluster-src.js'><\/script>");

//マーカーをグループ化する
var markers = L.markerClusterGroup();

	//Geojsonファイルを追加
	//説明：Geojsonの一番最初の行に「var 変数 = 」と一番最後の行に「;」を追加しておく
	//index.htmlに「<script src="./【Geojsonファイルの場所】"></script>」を追加しておく
	var Map_fukushi = L.geoJson(
		fukushidata,              //GeoJsonファイルに追加した変数名を指定
		{
    			onEachFeature: function(feature, layer){
        		layer.bindPopup('<b>名称：</b>' + feature.properties.名称 + '<br><b>市区町村：</b>' + feature.properties.市区町村 + '<br><b>所在地：</b>' + feature.properties.所在地);
    			}
		});

markers.addLayer(Map_fukushi);

map.addLayer(markers);

//オーバーレイ選択画面
var Map_Over = {
	"山": Map_Marker,
	"福祉施設": Map_fukushi,
	};


// スケール
L.control.scale({
	imperial: false, maxWidth:300 }) //「imperial: false」はフィート表示の設定
 	.addTo(map);


// レイヤコントロールの表示
L.control.layers(Map_BaseLayer,
	Map_Over, {          //オーバーレイを表示
	collapsed: false })  //「collapsed」は、コントロールを出したまま（false)にするか、アイコンにしまうか(true)選択
	.addTo(map);


