// ini untuk tombol nya
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};


// fungsi untuk tentukan kordinat tempat tempat
function staticLoadPlaces() {
    return [{
        name: 'Pokèmon',
        location: {
            lat: -5.3598719,
            lng: 105.3155716,
        },
    }, ];
}


// deklarasikan model nya
var models = [{
        url: './assets/ghost/scene.gltf',
        scale: '0.005 0.005 0.005',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/ghostie/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/conwing/scene.gltf',
        scale: '1 1 1',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
   // div.innerText = model.info;
};


// fungsi untuk load tempat
function renderPlaces(places) {
    let scene = document.querySelector('a-scene'); // ascane nya

    places.forEach((place) => { // looping load lokasi
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity'); // tampilkan di dalam a-entity
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', 'pinch-scale');


 // add place icon
 //const icon = document.createElement('a-image');
 //icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
 //icon.setAttribute('src', './assets/map-marker.png');
 //icon.setAttribute('scale', '20, 20');


        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}