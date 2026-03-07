function myFunction() {
    // リクエストメソッド用のクラス
  const headers     = { "Accept": "application/json", };
  const apiOperator = RestApiHelper.load(headers);
  const url  = 'https://weather.tsukumijima.net/api/forecast/city/080020';
  const json = apiOperator.GET(url);

  console.log(json);
}
