//Chat.tsx全体で使うstate
export interface MessageItem {
  id: number;
  item: string;
  type: string;
}

//エーアイのAPIに接続する
export const speechAPI = (textToSpeech: string) => {
  var query = {
    url: 'https://webapi.aitalk.jp/webapi/v2/ttsget.php?',
    param1: 'username=ibc948&password=QP5fnfa3&text=',
    text: textToSpeech,
    param2:
      '&speaker_name=nozomi_emo&volume=2.00&range=1.20&speed=1.00&ext=mp3',
  };
  //console.log(query);
  const uri = query.url + query.param1 + query.text + query.param2;
  //const context = new (window.AudioContext || window.webkitAudioContext)();
  const context = new window.AudioContext();
  let source = context.createBufferSource();
  fetch(uri)
    .then((response) => {
      const arrb = response.arrayBuffer();
      return arrb;
    })
    .then((arrayBuffer) => {
      context.decodeAudioData(
        arrayBuffer,
        function (buffer) {
          source.buffer = buffer;
        },
        null
      );
      source.connect(context.destination);
      source.start(0);
      //console.log('started');
    });
};
//type Eventvoid=(event: React.FormEvent<HTMLFormElement>) => void;
//export default MessageItem;
