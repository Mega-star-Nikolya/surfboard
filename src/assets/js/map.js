let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {

    // Задаем кардинаты
    center: [55.752004, 37.576133],

    // уменьшаем или увеличиваем масштаб
    zoom: 15,
  
    // отключаем все ненужные элементы - Пробки
    // controls: []
    controls: ['zoomControl', 'fullscreenControl']

  });

  // Задаем точки геолокации можно не одну
  const coords = [
    [55.752004, 37.576133]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './assets/images/map/map_click.png',
    iconImageSize: [58, 73],
    iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  // Отключаем возможность прокрутки 
  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);