const initText = 'Алоха ♥‿♥';
const texts = [
  [
    'Мой дом интернет, а твой — по другую сторону экрана ಠ‿ಠ',
    'Я знаю, что скролл до добра не доведет ⊜_⊜',
    'В сети уже много минут ヽ(。_°)ノ',
    'Целую экранчик, когда ты офлайнчик (˚Õ˚)ر ',
    'Я тут посижу с тобой, пока ты скролишь (^.^)/',
    'Если бы мне платили каждый раз, когда ты скролишь ツ',
    'Замечательный день для скролла ᴖ̮ ̮ᴖ',
    'Время пока есть, скроллим дальше ٩(-̮̮̃- ̃)۶',
  ], [
    'Делаешь вид что работаешь?',
    'Пять минут спустя — пора работать',
    'Тебе не нужен интернет, в нем жизни нет',
    'Соцсети — опиум для народа',
    'Зависимыми не рождаются, ими становятся',
    'Мы убиваем время, а время убивает нас © Эмиль Кроткий',
    'Ты в интернете оставляешь, так много времени и сил',
    'Ровно пять минут назад ты скроллил ленту',
    'Бытие определяет сознание © Карл Маркс',
    'Я скроллю, следовательно я существую?',
    'Ты там себе ничего не натер?',
    'Глаза еще не болят?',
    'Работа не волк, но уволить могут',
    'Ладно, давай по-плохому: а ну брысь работать!',
    'Ну что тут интересного?',
    'Сложно соблюдать режим?',
    'Дедлайн подкрадется незаметно',
    'А может с друзьями вечером встретимся?',
    'Делу время, потехе час',
    'Тик-так, тик-так',
    'Мало ли что они там пишут, завтра все забудешь',
  ], [
    'Если бы я кричал «УХОДИ ОТСЮДА!», Ты бы уже оглох',
    'Скрол в печень, никто не вечен',
    'Еще чуть-чуть и до Марианской впадины доскролишь',
    'Соцсети продолжат жить, а ты?',
    'Just close it',
    'Еще один пост, и закругляйся',
    'Кто нибудь, заберите его уже из интернета',
    'Давай, гаси соцсети, пора работать',
    'Твое время на исходе, продлить не получится',
    'Тебе за это не платят, почему ты продолжаешь скролить?',
    'Жми крестик, и покончим с этим',
    'Устрой дестрой, соцсети это отстой!',
    'Напоминаю, ты сам выставил таймер',
    'Я порчу соцсети, а не настроение',
    'Еще не поздно все исправить — уходи из соцсетей',
    'Один клик, и вкладка закроется',
    'Я что сам с собой разговариваю?',
    'Ты сам выставил ограничения. Я тут ни при чем',
    'Я делаю свою работу, а ты?',
    'Показать, где кнопка выкл?',
  ], [
    'Уходим, здесь не на что смотреть',
  ],
];

const phases = [
  {
    image: 'assets/images/serf-1-happy.png',
    className: '__se-sprite-happy',
    talkImage: 'assets/images/serf-2-happy-talk.png',
    talkClassName: '__se-sprite-happy-talk',
    transitionImage: 'assets/images/serf-3-happy-transition.png',
    transitionClassName: '__se-sprite-happy-transition',
  }, {
    image: 'assets/images/serf-4-concerned.png',
    className: '__se-sprite-conserned',
    talkImage: 'assets/images/serf-5-concerned-talk.png',
    talkClassName: '__se-sprite-concerned-talk',
    transitionImage: 'assets/images/serf-6-concerned-transition.png',
    transitionClassName: '__se-sprite-conserned-transition',
  }, {
    image: 'assets/images/serf-7-sad.png',
    className: '__se-sprite-sad',
    talkImage: 'assets/images/serf-8-sad-talk.png',
    talkClassName: '__se-sprite-sad-talk',
    transitionImage: 'assets/images/serf-9-sad-transition.png',
    transitionClassName: '__se-sprite-sad-transition',
  }, {
    image: 'assets/images/serf-10-shark.png',
    className: '__se-sprite-shark',
  }
];

window.__se = window.__se || {};
window.__se.initText = initText;
window.__se.texts = texts;
window.__se.phases = phases;
