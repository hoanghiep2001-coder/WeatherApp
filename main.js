$(document).ready(function () {

    var content = $('.content')
    var search = $('.search')
    var city = $('.city')
    var time = $('.time')
    var country = $('.country')
    var value = $('.value')
    var shortDesc = $('.short-desc')
    var visibility = $('.visibility span')
    var wind = $('.wind span')
    var sun = $('.sun span')

    var app = {
        
        fetch: async function (inputSearchCapital) {
            var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearchCapital}&appid=3b23281aaf9c175141688f9e97db3c30`
            var data = await fetch(apiURL).then(res => res.json()) 
            var todayDate = new Date().toLocaleString('vi')

            if (data.cod == 200) {
                $(content).removeClass('hide');
                $(city).html(data.name) 
                $(time).html(todayDate);
                $(country).html(data.sys.country)

                // đổi từ độ K sang độ C
                var temp = Math.round(data.main.temp - 273.15);
                var tempFull = Math.round(data.main.temp - 273.15) + ' <sup>o</sup>C';
                $(value).html(tempFull)
                $(shortDesc).html(data.weather.main);
                $(visibility).html(data.visibility + 'm')
                $(wind).html(data.wind.speed + 'm/s');
                $(sun).html(data.main.humidity + '%');

                if (temp < 20) {
                    $('.weather').removeClass('hot')
                    $('body').attr('class', 'cold');
                    $('.weather').addClass('cold')

                } else {
                    $('.weather').removeClass('cold')
                    $('body').attr('class', 'hot');
                    $('.weather').addClass('hot')
                }

            } else {
                $(content).addClass('hide');
            }
        },
        hanldeEvent:  function () {
            
            var _this = this

            $(search).keypress(function (e) { 
                // code trong console phần original là sẽ thấy
                if (e.code === 'Enter') {
                    var inputSearchCapital = $(search).val().trim()
                    _this.fetch(inputSearchCapital)
                }
            });
        },
        start: function() {
            this.hanldeEvent()
            this.fetch('hanoi')
        }
    }

    app.start()
});