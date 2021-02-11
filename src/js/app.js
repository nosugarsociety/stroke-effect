(() => {
  const sceneInfo = [
    {
      // Scene 0
      type: 'sticky',
      heightNum: 3, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      obj: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        pencilLogo: document.querySelector('#scroll-section-0 .pencil-logo'),
        pencil: document.querySelector('#scroll-section-0 .pencil'),
        ribbonPath: document.querySelector('.ribbon-path path'),
      },
    },
  ];

  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      // if (sceneInfo[i] === 'sticky') {
      // sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      // }
    }
  };

  window.addEventListener('load', () => {
    document.body.classList.remove('before-load');
    setLayout();
  });
})();
