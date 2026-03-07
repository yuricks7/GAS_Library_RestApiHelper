/*******************************************
 * ライブラリ（実行可能API）として公開
 *
 * 公開日：2020年06月05日（金）JST
 * スコープ：ドメイン内
 * キー：1_TDv0sV9l82h85UPEQ5JQZNSUyRGGyBX3J5LWQl7PL7pSfvkfdIPgDHa
 *
 * 作成者：yuricks7
 *******************************************/

/**
 * RestApiHelperをインスタンス化するためのファクトリメソッド
 * 
 * @param {object} headers       - HTTPリクエストのヘッダー
 * @param {string} headers.key   - ヘッダーの項目
 * @param {string} headers.value - ヘッダーの設定値
 *
 * @return {RestApiHelper} RestApiHelperクラスのインスタンス
 */
// ↑`@return`の{}の中にライブラリのGASプロジェクトと同じ名前を指定する。
function load(headers) {
  return new RestApiHelper(headers);
}

// 補完させたいメソッドのダミーメソッドをグローバルメソッドとして作る。

/**
 * GETリクエスト
 *
 * 【参考】
 * chatwork-client-gas - cw-shibuya | GitHub
 * https://github.com/cw-shibuya/chatwork-client-gas/blob/master/client.js
 *
 * @param {string} endpoint リクエストの送信先
 *
 * @return {string|false} HTTPリクエストの結果
 */
function GET() {
  throw new Error('loadメソッドを呼び出してから呼び出してください。');
}

/**
 * POSTリクエスト
 *
 * 【参考】
 * chatwork-client-gas - cw-shibuya | GitHub
 * https://github.com/cw-shibuya/chatwork-client-gas/blob/master/client.js
 *
 * @param {string} endpoint     リクエストの送信先
 * @param {object} params       ヘッダー以外のパラメータ
 * @param {string} params.key   パラメータの項目
 * @param {string} params.value パラメータの設定値
 *
 * @return {string|false} HTTPリクエストの結果
 */
function POST() {
  throw new Error('loadメソッドを呼び出してから呼び出してください。');
}

/**
 * PUTリクエスト
 *
 * 【参考】
 * chatwork-client-gas - cw-shibuya | GitHub
 * https://github.com/cw-shibuya/chatwork-client-gas/blob/master/client.js
 *
 * @param {string} endpoint     リクエストの送信先
 * @param {object} params       ヘッダー以外のパラメータ
 * @param {string} params.key   パラメータの項目
 * @param {string} params.value パラメータの設定値
 *
 * @return {string|false} HTTPリクエストの結果
 */
function PUT() {
  throw new Error('loadメソッドを呼び出してから呼び出してください。');
}