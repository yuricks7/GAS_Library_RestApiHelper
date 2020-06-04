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

    // console.info(options);

    const response     = UrlFetchApp.fetch(endpoint, options);
    const responseCode = response.getResponseCode();

    // 結果をチェック
    const statusCodes = {
      succeed:     200,
      clientError: 400, // 400番台
      serverError: 500, // 500番台
    }
    // リクエストに成功していたら結果を解析して返す
    if (responseCode === statusCodes.succeed) {
      return JSON.parse(response.getContentText());

    } else if (statusCodes.clientError <= responseCode && responseCode < statusCodes.serverError) {
      console.info('リクエストの書き方が正しくないかもしれません…');

    } else if (statusCodes.serverError <= responseCode) {
      console.info('サーバーが調子悪いかもです…');

    } else {
      console.info('何故かリクエストに失敗しました…');

    }

    return false;
  };
};
