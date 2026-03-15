function test02() {
  const rah = new RestApiHelper();
  rah._isSuccessful(503);
}


function test() {
  interpretResponse(500);
}

/**
 * 【参考】
 * - HTTPステータスコード一覧とリクエストとレスポンスの意味を解説 | ITコラム｜アイティーエム株式会社
 *   https://www.itmanage.co.jp/column/http-www-request-response-statuscode/
 * - HTTPステータスコードとは？種類とそれぞれの役割について｜Webマーケティング・SEO相談はデジ研
 *   https://digital-marketing.jp/seo/http-status-code/#300
 */
function interpretResponse(responseCode) {
  let res = {};
  switch (true) {
    case 600 <= responseCode:
      res = unknownError(responseCode);
      break;

    case 500 <= responseCode:
      res = serverError(responseCode);
      break;

    case 400 <= responseCode:
      res = clientError(responseCode);
      break;

    case 300 <= responseCode:
      res = {
        en: 'Redirect',
        ja: 'リダイレクトか移行が発生しています。'
      }
      break;

    case 200 <= responseCode:
      res = {
        en: 'Response Succeeded',
        ja: 'リクエストの処理に成功しました。'
      }
      break;

    case 100 <= responseCode:
      res = {
        en: 'Work in Progress',
        ja: 'ただいま処理中です。'
      }
      break;

    default:
      res = unknownError(responseCode);
  }

  let m = '';
  m += '---------------------------------\n';
  m += `【${responseCode}】${res.en}\n`
  m += '---------------------------------\n';
  m += `${res.ja}`;
  console.error(m);

  return m;
}

/**
 * HTTP 400番台 Client Error（クライアントエラー）
 */
const clientError = (responseCode) => {

  let res = {};
  switch (responseCode) {
    case 400:
      res = {
        en: 'Bad Request',
        ja: 'クライアント側でエラーが発生しています。',
      }
      break;

    case 401:
      res = {
        en: 'Unauthorized',
        ja: 'アクセス権が無いか、認証に失敗しています。\n権限や認証の内容を確認してください。',
      }
      break;

    case 402:
      res = {
        en: 'Payment Required',
        ja: '料金の支払いが完了するまで、リクエストは処理されません。\n必要な手続きを取ってください。',
      }
      break;

    case 403:
      res = {
        en: 'Forbidden',
        ja: '該当のファイルやフォルダの閲覧権限がありません。\n権限を確認してください。',
      }
      break;

    case 404:
      res = {
        en: 'Not Found',
        ja: 'Webページが見つかりません。\n削除か移動された可能性があります。',
      }
      break;

    case 405:
      res = {
        en: 'Method Not Allowed',
        ja: 'そのメソッドは許可されていません。',
      }
      break;

    case 406:
      res = {
        en: 'Not Acceptable',
        ja: 'サーバ側が受付不可能な値（ファイルの種類など）です。\nリクエストの内容を改めて確認してください。',
      }
      break;

    case 407:
      res = {
        en: 'Proxy Authentication Required',
        ja: 'プロキシサーバ経由で通信を行う際に、プロキシサーバの認証情報が不足しています。\n情報を確認してください。',
      }
      break;

    case 408:
      res = {
        en: 'Request Timeout',
        ja: 'リクエスト送信後のやり取りに時間が掛かり過ぎています。',
      }
      break;

    case 409:
      res = {
        en: 'Conflict',
        ja: 'サーバに既に存在しているデータが競合しており、リクエストを完了できません。\nそれぞれのデータを確認してください。',
      }
      break;

    case 410:
      res = {
        en: 'Gone',
        ja: 'ファイルは削除され、ほぼ永久的にWebページが存在しません。',
      }
      break;

    case 411:
      res = {
        en: 'Length Required',
        ja: 'サーバの方でContent-Lengthヘッダが無いため、アクセスを拒否されています。\n' + 
            '（※Content-Lengthとは、リクエストヘッダに送るデータ容量が書いてある項目のこと）',
      }
      break;

    case 412:
      res = {
        en: 'Precondition Failed',
        ja: 'アクセスを拒否されました。\nヘッダで定義された前提条件が満たされているか、確認してください。',
      }
      break;

    case 413:
      res = {
        en: 'Payload Too Large',
        ja: 'アップロードするファイルの容量が上限を超えています。',
      }
      break;

    case 414:
      res = {
        en: 'URI Too Long',
        ja: 'URLが長すぎます。',
      }
      break;

    case 415:
      res = {
        en: 'Unsupported Media Type',
        ja: 'アクセスを拒否されました。\n送信するリクエストの種類が、サーバで許可されているか確認してください。',
      }
      break;

    case 416:
      res = {
        en: 'Range Not Satisfiable',
        ja: 'リクエストされた範囲（容量）をサーバが提供できません。',
      }
      break;

    case 417:
      res = {
        en: 'Expectation Failed',
        ja: 'サーバが、拡張されたステータスコードを返すことが出来ません。',
      }
      break;

    case 422:
      res = {
        en: 'Unprocessable Entity',
        ja: '（※WebDAVの拡張ステータスコード）\nリクエストは適正ですが、意味が異なるためサーバが返すことが出来ません。',
      }
      break;

    case 423:
      res = {
        en: 'Locked',
        ja: '（※WebDAVの拡張ステータスコード）\nリクエスト内容がロックされているためサーバが返すことが出来ません。',
      }
      break;

    case 425:
      res = {
        en: 'Too Early',
        ja: 'サーバが繰り返し処理が発生される可能性のあるリクエストと判断し、処理が出来ません。\n' + 
            '（※無限ループでサーバに高負荷がかかるリスクの可能性がある為）',
      }
      break;

    case 426:
      res = {
        en: 'Upgrade Required',
        ja: '（※Upgrading to TLS Within HTTP/1.1の拡張ステータスコード）\n' + 
            'サーバが処理できません。HTTP/1.1にアップグレードしてください。',
      }
      break;

    case 429:
      res = {
        en: 'Too Many Requests',
        ja: 'リクエストのサイズが大きすぎて、サーバーに拒否されています。\n余裕があれば「Retry-After ヘッダー」を確認してください。',
      }
      break;

    case 431:
      res = {
        en: 'Request Header Fields Too Large',
        ja: 'リクエストヘッダーが長すぎてサーバに拒否されました。\n内容を確認してください。',
      }
      break;

    default:
      res = {
        en: '',
        ja: 'リクエストの書き方が正しくないかもしれません…',
      }
  }

  return res;
}

/**
 * HTTP 500番台 Server Error（サーバエラー）
 */
const serverError = (responseCode) => {
  switch (responseCode) {
    case 500:
      res = {
        en: 'Internal Server Error',
        ja: 'サーバ内で何らかのエラーが起きています。\nしばらくお待ちください。',
      }
      break;

    case 501:
      res = {
        en: 'Not Implemented',
        ja: 'リクエストを満たすのに必要な機能が、このサーバでサポートされていません。',
      }
      break;

    case 502:
      res = {
        en: 'Bad Gateway',
        ja: 'ゲートウェイ・プロキシサーバが、不正なリクエストを受け取り拒否しました。',
      }
      break;

    case 503:
      res = {
        en: 'Service Unavailable',
        ja: '一時的にサーバにアクセスが出来ない状態です。\nしばらくお待ちください。',
      }
      break;

    case 504:
      res = {
        en: 'Gateway Timeout',
        ja: 'サーバからの適切なレスポンスが無く、タイムアウトしました。',
      }
      break;

    case 505:
      res = {
        en: 'HTTP Version Not Supported',
        ja: 'このHTTP バージョンはサーバによってサポートされていません。',
      }
      break;

    case 506:
      res = {
        en: 'Variant Also Negotiates',
        ja: '（※Transparent Content Negotiation in HTTPで定義されている拡張ステータスコード）' + 
            'URLを返すコンテンツで、配置ミスなどによる内部サーバエラーが発生しています。',
      }
      break;

    case 507:
      res = {
        en: 'Insufficient Storage',
        ja: '（※WebDAV拡張ステータスコード）' + 
            'サーバで処理するためのストレージ容量が不足しています。',
      }
      break;

    case 508:
      res = {
        en: 'Loop Detected',
        ja: '（主に開発中のプログラム処理で）無限ループに陥ったため、サーバーが操作を終了しました。',
      }
      break;

    case 510:
      res = {
        en: 'Not Extended',
        ja: '（主に静的ファイルへのアクセス集中による）一時的に表示されるエラーです。',
      }
      break;

    case 511:
      res = {
        en: 'Network Authentication Required',
        ja: 'ネットワーク認証が必要です。\n必要な情報を確認してください。',
      }
      break;

    default:
      res = {
        en: '',
        ja: 'サーバーが調子悪いかもです…しばらくお待ち下さい…',
      }

  }

  return res;
}

/**
 * 不明なエラー
 */
const unknownError = (responseCode) => {
  return {
    en: 'UNKNOWN ERROR',
    ja: '予期しない番号です。\nよく分からないけど何故かリクエストに失敗したみたいです…',
  }
}