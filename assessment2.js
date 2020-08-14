// より関数化したコード
'user strict';
// htmlの要素をプログラムから動かせるように変数宣言
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した子供の要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
// すでにある診断結果を削除 Childはタグのこと
function removeAllChildren(element) {
	while (element.firstChild) {
	//子供の要素がある限り削除（ループ）
		element.removeChild(element.firstChild);
	}
}

const answers = [
	'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
	'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
	'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
	'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
	'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
	'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
	'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
	'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
	'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
	'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
	'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
	'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
	'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
	'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
	'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
	'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
	'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * ＠param {string} userName
 * @return {string}
 */
function assessment(userName) {
	//全文字のコード番号を取得して足し合わせる
	let sum0fCharCode = 0;
	for ( let i = 0; i < userName.length; i++) {
		sum0fCharCode += userName.charCodeAt(i);
	}
	//文字コードの番号の合計を回答の数で割って添字の数値を求める
	let index = sum0fCharCode % answers.length;
	// 正規表現を使って置き換える
	return answers[index].replace(/\{userName\}/g, userName);
}

/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} elementHTMLの要素
 * @param {string} result 診断結果のテキスト
 */

function appendAssessmentResult(element, result) {
	// result-areaにh3タグで’診断結果’という文字を表示
	const h3 = document.createElement('h3');
	h3.innerText = '診断結果';
	//result-areaにh3変数を設定
	element.appendChild(h3);
// result-areaに診断結果を表示
	const p = document.createElement('p');
	p.innerText = result;
	element.appendChild(p);
}

/**
 * 指定した要素にツイートボタンを設定する
 * @param {HTMLElement} elementHTMLの要素
 * @param {string} message ツイート本文
 */
function appendTweetButton(element, message) {
	// JavaScriptでアンカータグを作る
	const a = document.createElement('a');
	const href = 
	'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
	a.setAttribute('href', href);
	a.setAttribute('class', 'twitter-hashtag-button');
	a.setAttribute('data-text', message);
	a.innerText = 'Tweet #あなたのいいところ';
	// <a>をhtmlに作る
	element.appendChild(a);
	// //widgets.js（外部ライブラリ）の設定 スクリプトタグを作る
	const script = document.createElement('script');
	script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
	// <script>をhtmlに作る
	element.appendChild(script);
};

	assessmentButton.onclick = () => {
		//名前を受け取る
		let userName = userNameInput.value;
		if (!userName) {
			//名前が空の時は処理を終了する
			return;
		}
		// 診断結果の表示
		removeAllChildren(resultDivided);
		const result =assessment(userName);
		appendAssessmentResult(resultDivided,assessment(userName));
		// 結果の表示
		removeAllChildren(tweetDivided);
		appendTweetButton(tweetDivided, result);
	};

// エンターキーが押された時も、診断が実行される機能
userNameInput.onkeydown = event => {
	if (event.key === 'Enter') {
		assessmentButton.onclick();
	}
};

// テスト
console.assert (
	assessment('太郎') ===
	'太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', //チェックしたいこと
	'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' //エラー時に出したいメッセージ
)

console.assert (
	assessment('太郎') === assessment('太郎'),
	'入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません'
);

