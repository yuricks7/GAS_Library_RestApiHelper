(function(global){
  /**
   * ライブラリ用にグローバルなインスタンスを生成
   */
  class RestApiHelper {
    
    /**
    * RestApiHelperオブジェクトを生成する
    *
    * @param {object} headers       HTTPリクエストのヘッダー
    * @param {string} headers.key   ヘッダーの項目
    * @param {string} headers.value ヘッダーの設定値
    *
    * @return {RestApiHelper} RestApiHelperオブジェクト
    */
    constructor(headers) {
      // HTTPリクエストの設定値
      this.requestHeaders = headers;
      
      // return this;
    }
    
    /**
     * GETリクエスト
     *
     * 【参考】
     * chatwork-client-gas - cw-shibuya | GitHub
     * https://github.com/cw-shibuya/chatwork-client-gas/blob/master/client.js
     *
     * @param {string} endpoint リクエストの送信先
     * @param {object} headers       HTTPリクエストのヘッダー
     * @param {string} headers.key   ヘッダーの項目
     * @param {string} headers.value ヘッダーの設定値
     *
     * @return {{} | false} HTTPリクエストの戻り値を解析した結果
     */
    GET(endpoint, headers = this.requestHeaders) {
      return this._sendRequest(endpoint, 'get', headers);
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
     * @param {object} headers       HTTPリクエストのヘッダー
     * @param {string} headers.key   ヘッダーの項目
     * @param {string} headers.value ヘッダーの設定値
     *
     * @return {{} | false} HTTPリクエストの戻り値を解析した結果
     */
    POST(endpoint, params, headers = this.requestHeaders) {
      return this._sendRequest(endpoint, 'post', params, headers);
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
     * @param {object} headers       HTTPリクエストのヘッダー
     * @param {string} headers.key   ヘッダーの項目
     * @param {string} headers.value ヘッダーの設定値
     *
     * @return {{} | false} HTTPリクエストの戻り値を解析した結果
     */
    PUT(endpoint, params, headers = this.requestHeaders) {
      return this._sendRequest(endpoint, 'put', params, headers);
    }
    
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
     * @param {object} headers       HTTPリクエストのヘッダー
     * @param {string} headers.key   ヘッダーの項目
     * @param {string} headers.value ヘッダーの設定値
     *
     * @return {{} | false} HTTPリクエストの戻り値を解析した結果
     */
    _sendRequest(endpoint, method, jsonParams = {}, headers = this.requestHeaders) {
      
      if (Object.keys(jsonParams).length === 0) {
        jsonParams = {"":""};
      }

      const options = {
        method : method,
        headers: headers,
        payload: jsonParams,
        muteHttpExceptions: true,
        // muteHttpExceptions: false, // エラーの詳細を見たい時だけ！
      };

      try {
        const response     = UrlFetchApp.fetch(endpoint, options);
        const responseCode = response.getResponseCode();

        // Slackの画像投稿用（レスポンスとして`OK - xxxxxx`形式で返ってくることがあるため）
        if(response.toString().includes('OK - ')) return true;

        // リクエストに成功していたら結果を解析して返す
        const parsedJson = JSON.parse(response.getContentText());
        if (this._isSuccessful(responseCode)) return parsedJson; // 正常な戻り値
        return false;

      } catch(e) {
        // 例外エラー処理
        console.error(`【HTTPリクエストに失敗しました】\n${e.stack}`);
        return false
      }
    }
    
    /**
    * HTTPリクエストのレスポンス・コードを確認する
    *
    * @param {number} responseCode レスポンス・コード
    *
    * @return {boolean} リクエストの成否
    */
    _isSuccessful(responseCode) {
      const statusJunctions = {
        succeed    : 200,
        clientError: 400,
        serverError: 500,
      }
      
      if (responseCode === statusJunctions.succeed) return true;
      
      let m = '';
      if (statusJunctions.clientError <= responseCode && responseCode < statusJunctions.serverError) {
        m += `【HTTPレスポンスコード】${responseCode}\n`;
        m += 'リクエストの書き方が正しくないかもしれません…';
        console.error(m);
        
      } else if (statusJunctions.serverError <= responseCode) {
        m += `【HTTPレスポンスコード】${responseCode}\n`;
        m += 'サーバーが調子悪いかもです…しばらくお待ち下さい…';
        console.error(m);
        
      } else {
        m += `【HTTPレスポンスコード】${responseCode}\n`;
        m += 'よく分からないけど何故かリクエストに失敗したみたいです…';
        console.error(m);
        
      }
      
      return false;
    }
  }

  global.RestApiHelper = RestApiHelper;
})(this);