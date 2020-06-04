/*******************************************
 * ライブラリ（実行可能API）として公開
 *
 * 公開日：2020年06月05日（金）JST
 * スコープ：ドメイン内
 * キー：MAP-TKAd-mIbjUlDwtUPiMLsm5oI_A_1R
 *
 * 作成者：yuricks7
 *******************************************/

/**
 * ライブラリ用にグローバルなインスタンスを生成
 *
 * @param {object} global （グローバル領域の）thisオブジェクト
 */
(function(global){
  const globalApiOperator = (
    function() {
      class RestApiOperator{

        /**
         * コンストラクタ
         *
         * @param {object} headers       HTTPリクエストのヘッダー
         * @param {string} headers.key   ヘッダーの項目
         * @param {string} headers.value ヘッダーの設定値
         */
        constructor(headers) {
          // HTTPリクエストの設定値
          this.requestHeaders = headers;

          return this;
        }

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
        GET(endpoint) {
          return this._sendRequest(endpoint, 'get');
        };

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
        POST(endpoint, params) {
        return this._sendRequest(endpoint, 'post', params);
        };

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
        PUT(endpoint, params) {
          return this._sendRequest(endpoint, 'put', params);
        };

        /**
         * HTTPリクエストを送信する
         *
         * 【参考】
         * chatwork-client-gas - cw-shibuya | GitHub
         * https://github.com/cw-shibuya/chatwork-client-gas/blob/master/client.js
         *
         * @param {string} endpoint     エンドポイントURL
         * @param {string} method       リクエスト・メソッド
         * @param {object} jsonParams       ヘッダー以外のパラメータ
         * @param {string} jsonParams.key   パラメータの項目
         * @param {string} jsonParams.value パラメータの設定値
         *
         * @return {string|false} HTTPリクエストの戻り値を解析した結果
         */
        _sendRequest(endpoint, method, jsonParams = {}) {

          if (Object.keys(jsonParams).length === 0) {
            jsonParams = {"":""};
          }

          const options = {
            method:             method,
            headers:            this.requestHeaders,
            payload:            jsonParams,
            muteHttpExceptions: true,
          };

          const response     = UrlFetchApp.fetch(endpoint, options);
          const responseCode = response.getResponseCode();

          // リクエストに成功していたら結果を解析して返す
          if (this._isSuccessful(responseCode)) return JSON.parse(response.getContentText());
          return false;

        };

        /**
         * HTTPリクエストのレスポンス・コードを確認する
         *
         * @param {number} responseCode レスポンス・コード
         *
         * @return {boolean} リクエストの成否
         */
        _isSuccessful(responseCode) {
          const statusJunctions = {
            succeed:     200,
            clientError: 400,
            serverError: 500,
          }

          if (responseCode === statusJunctions.succeed) return true;

          if (statusJunctions.clientError <= responseCode && responseCode < statusJunctions.serverError) {
            console.info('リクエストの書き方が正しくないかもしれません…');

          } else if (statusJunctions.serverError <= responseCode) {
            console.info('サーバーが調子悪いかもです…');

          } else {
            console.info('何故かリクエストに失敗しました…');

          }

          return false;
        };
      };

      return RestApiOperator;
    }
  )();

  global.RestApiOperator = globalApiOperator;
})(this);

/**
 * クラスの呼び出し
 *
 * @param {object} headers       HTTPリクエストのヘッダー
 * @param {string} headers.key   ヘッダーの項目
 * @param {string} headers.value ヘッダーの設定値
 *
 * @return {RestApiOperator} RestApiOperatorクラスのインスタンス
 */
function Load(headers) {
  return new RestApiOperator(headers);
};
