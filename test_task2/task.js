/* デモ用のストループ課題 */
/* 教示 */
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p style='text-align:left;font-size:20pt'>これはテスト課題です。</p>"+
      "<p style='text-align:left;font-size:20pt'>画面に数字が提示されますので，２がでてきたら，キーボードの「n」を押してください。</p>"+
      "<p style='text-align:left;font-size:20pt'>キーボードのキーをどれか押すと課題が始まります。準備ができたら始めてください。</p>",
  post_trial_gap: 1000
};

/*課題*/
var stimuli = [
{ number: "<p style='font-size:40pt'>1</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>2</p>", data:{target: "1"}},
{ number: "<p style='font-size:40pt'>3</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>4</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>5</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>6</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>7</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>8</p>", data:{target: "0"}},
{ number: "<p style='font-size:40pt'>9</p>", data:{target: "0"}},
];

var cp = {
  timeline: [{
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable("number"),
    choices: ['n'],
    trial_duration: 800,
    prompt: '2が出たらnを押す',
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data){
      var correct = 0;
      var false_alarm = 0;
      if(data.response == 'n' && data.target == '1'){
        correct = 1;
      } else if (data.response == 'n' && data.target == '0'){
        false_alarm = 1;

      }
      data.correct = correct;
      data.false_alarm = false_alarm;
    },
    post_trial_gap: function() {
        return Math.floor(Math.random() * 1500) + 500;
    }
  }],
  timeline_variables: stimuli,
  sample: {type: 'fixed-repetitions',size: 1}
};

/*デブリーフィング*/
var debrief = {
  type: "html-keyboard-response",
  stimulus: function() {
    var correct_rate = Math.round(jsPsych.data.get().filter({correct: 1}).count() / 9 * 100);
    var false_alarm_rate = Math.round(jsPsych.data.get().filter({false_alarm: 1}).count() / 9 * 100);
    return "<p>あなたの正答率は，<strong>"+correct_rate+"%</strong>でした。</p> " +
    "<p>そして，お手つき率(間違ってnを押した確率)は，<strong>"+false_alarm_rate+"%</strong>でした。</p> " +
    "<p>キーボードのキーをどれか押すと，テスト課題が終わります。</p>";
  }
};
/*タイムラインの設定*/
var timeline = [fullscreen,instructions,cp,debrief];
