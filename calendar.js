document.querySelectorAll('a').forEach(link => {
    link.setAttribute('target', '_blank');
});
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.override-target');
    links.forEach(link => {
        link.target = '_parent';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the 'month' and 'date' from the URL
    const month = urlParams.get('month');
    const date = parseInt(urlParams.get('date'), 10); // Convert to an integer

    // Define the holidays array
    const holidays = [
        { month: 'January', date: 1, holiday: 'New Year\'s Day',
            details: 'In the Gregorian calendar, New Year\'s Day is the first day of the calendar year, 1 January. Most solar calendars (like the Gregorian and Julian) begin the year regularly at or near the northern winter solstice, while cultures and religions that observe a lunisolar or lunar calendar celebrate their Lunar New Year at less fixed points relative to the solar year.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mexico_City_New_Years_2013%21_%288333128248%29.jpg/1280px-Mexico_City_New_Years_2013%21_%288333128248%29.jpg',
            link: 'https://en.wikipedia.org/wiki/New_Year%27s_Day'
        },
        { month: 'January', date: 29, holiday: 'Chinese New Year', details: 'Chinese New Year, or the Spring Festival, is a festival that celebrates the beginning of a new year on the traditional lunisolar Chinese calendar. Marking the end of winter and the beginning of spring, this festival traditionally takes place from Chinese New Year\'s Eve, the evening preceding the first day of the year, to the Lantern Festival, held on the 15th day of the year. The first day of Chinese New Year begins on the new moon that appears between 21 January and 20 February.', 
            image: 'https://cdn.britannica.com/45/195645-050-C2BA680A/parade-Chinese-New-Year-Los-Angeles.jpg',
        link: 'https://en.wikipedia.org/wiki/Chinese_New_Year' },
        { month: 'February', date: 25, holiday: 'EDSA People Power Revolution Anniversary', details: 'The People Power Revolution, also known as the EDSA Revolution[a] or the February Revolution, were a series of popular demonstrations in the Philippines, mostly in Metro Manila, from February 22 to 25, 1986. There was a sustained campaign of civil resistance against regime violence and electoral fraud. ', 
            image: 'https://www.rappler.com/tachyon/2022/02/akbayan-youth-edsa-people-power-february-20-2022-004.jpg' ,
            link:'https://en.wikipedia.org/wiki/People_Power_Revolution#:~:text=The%20People%20Power%20Revolution%2C%20also,regime%20violence%20and%20electoral%20fraud.'},
        { month: 'April', date: 9, holiday: 'Araw ng Kagitingan', details: 'Araw ng Kagitingan, also known as Bataan Day or Bataan and Corregidor Day, is an observance in the Philippines that commemorates the fall of Bataan on April 9, 1942, during World War II .', 
            image: 'https://ptvnews.ph/wp-content/uploads/2023/04/MARCOS.jpg', 
            link: 'https://tl.wikipedia.org/wiki/Araw_ng_Kagitingan'
        },
        { month: 'April', date: 17, holiday: 'Maundy Thursday', details: 'Maundy Thursday or Holy Thursday, among other names, is the day during Holy Week that commemorates the Washing of the Feet (Maundy) and Last Supper of Jesus Christ with the Apostles, as described in the canonical gospels.', 
            image: 'https://cdn.britannica.com/61/214961-050-A6B00CB6/Pope-Francis-Muslim-Christian-Hindu-refugees-Castelnuovo-di-Porto-Rome-Italy-Maudy-Thursday-2016.jpg',
        link:'https://en.wikipedia.org/wiki/Maundy_Thursday' },
        { month: 'April', date: 18, holiday: 'Good Friday', details: 'Good Friday is a Christian holy day observing the crucifixion of Jesus and his death at Calvary. It is observed during Holy Week as part of the Paschal Triduum. It is also known as Black Friday, Holy Friday, Great Friday, Good Friday of the Passion of the Lord, Great and Holy Friday (also Holy and Great Friday).', 
            image: 'https://www.hindustantimes.com/ht-img/img/2024/03/28/1600x900/PTI03-27-2024-000225B-0_1711619292365_1711619332914.jpg',
        link:'https://en.wikipedia.org/wiki/Good_Friday' },
        { month: 'April', date: 19, holiday: 'Black Saturday', details: 'Holy Saturday (Latin: Sabbatum Sanctum), also known as Great and Holy Saturday (also Holy and Great Saturday), Low Saturday, the Great Sabbath, Hallelujah Saturday (in Portugal and Brazil), Saturday of the Glory, Sábado de Gloria, and Black Saturday or Easter Eve,  and called "Joyous Saturday", "the Saturday of Light", and "Mega Sabbatun" among Coptic Christians, is the final day of Holy Week, between Good Friday and Easter Sunday, when Christians prepare for the latter.', 
            image: 'https://cebufinest.com/wp-content/uploads/2017/03/cebufinest_blacksaturday_holyweek.jpg',
        link:'https://en.wikipedia.org/wiki/Holy_Saturday' },
        { month: 'May', date: 1, holiday: 'Labor Day', details: 'May 1 of every year is dedicated to honor and recognize the hard work and significant contributions of workers in the economic and social development of the society. Thus, the #NationalLibraryPH salutes all Filipino workers in the different parts of the world in celebration of Labor Day or Araw ng Paggawa. The first Labor Day commemoration in the Philippines took place on May 1, 1903. The Union Obrera Democratica de Filipinas, the nation’s first labor federation, organized it. In order to demand full independence, thousands of workers marched from Plaza Moriones in Tondo to Malacaang while singing anti-American capitalism and imperialism.', 
            image: 'https://i2.wp.com/thefilipinochronicle.com/wp-content/uploads/2023/09/2-Labor-Day-as-a-National-Holiday-and-How-to-Celebrate-it-v2.jpg?fit=1200%2C720&ssl=1',
            link:'https://web.nlp.gov.ph/labor-day/' },
        { month: 'June', date: 12, holiday: 'Independence Day', details: 'Independence Day (Filipino: Araw ng Kasarinlán; also known as Araw ng Kalayaan, "Day of Freedom") is a national holiday in the Philippines observed annually on June 12, commemorating the declaration of Philippine independence from Spain in 1898. Since 1978, it has been the country\'s National Day.', 
            image: 'https://images.gmanews.tv/webpics/2024/06/Screenshot_2024-06-03_at_17_2024_06_03_17_30_28.png',
            link:'https://en.wikipedia.org/wiki/Independence_Day_(Philippines)#:~:text=Independence%20Day%20(Filipino%3A%20Araw%20ng,independence%20from%20Spain%20in%201898.' },
        { month: 'August', date: 21, holiday: 'Ninoy Aquino Day', details: 'Ninoy Aquino Day is a national non-working holiday in the Philippines observed annually on August 21 commemorating the assassination of former Senator Benigno "Ninoy" Aquino, Jr., the husband of Corazon Aquino, who later became the eleventh Philippine President. His assassination led to the downfall of the tenth president, dictator, and kleptocrat Ferdinand Marcos, which ultimately resulted in the People Power Revolution on February 25, 1986. Since 2004, a commemoration ceremony is traditionally held that was attended by presidents Gloria Macapagal Arroyo, Fidel V. Ramos and Benigno Aquino III.', 
            image: 'https://tarlakenyo.com/wp-content/uploads/2023/08/ninoy-day-2023.png',
            link:'https://en.wikipedia.org/wiki/Ninoy_Aquino_Day' },
        { month: 'August', date: 25, holiday: 'National Heroes Day', details: 'National Heroes\' Day (Filipino: Araw ng mga Bayani) is a national public holiday in the Philippines observed every last Monday in August to mark the anniversary of the Cry of Pugad Lawin, the beginning of the Philippine Revolution by the Katipunan and its Supremo Andrés Bonifacio in 1896. This holiday was originally kept on the last Sunday of August in 1931, but in 2007 was moved to its present date by President Gloria Macapagal-Arroyo to reduce work disruptions, allow for longer weekends, and boost domestic tourism and businesses.', 
            image: 'https://images.metronewscentral.net/kZgtV8ZKkdtaguig-nat-heroes.jpg' ,
            link:'https://en.wikipedia.org/wiki/National_Heroes_Day_(Philippines)'},
        { month: 'October', date: 31, holiday: 'All Saints\' Day Eve', details: 'Being the vigil of All Saints\' Day (All Hallows\' Day), in many countries, such as Ireland, the United Kingdom, the United States and Canada, Halloween (All Hallows\' Eve or All Saints\' Eve) is celebrated on 31 October.', 
            image: 'https://cdn.vanguardngr.com/wp-content/uploads/2022/11/image.png' ,
            link:'https://en.wikipedia.org/wiki/All_Saints%27_Day'},
        { month: 'November', date: 1, holiday: 'All Saints\' Day', details: 'All Saints\' Day, also known as All Hallows\' Day, the Feast of All Saints, the Feast of All Hallows, the Solemnity of All Saints, and Hallowmas, is a Christian solemnity celebrated in honour of all the saints of the Church, whether they are known or unknown.', 
            image: 'https://cdn.vanguardngr.com/wp-content/uploads/2022/11/image.png' ,
            link:'https://en.wikipedia.org/wiki/All_Saints%27_Day'},
        { month: 'November', date: 30, holiday: 'Bonifacio Day', details: 'Bonifacio Day is a national holiday in the Philippines, commemorating Andrés Bonifacio, one of the country\'s national heroes. He was the founder and eventual Supremo of the Katipunan, a secret society that triggered the Philippine Revolution of 1896 against the Spanish Empire. It is celebrated every November 30, the birth anniversary of Bonifacio. It also coincides with the feast day of Saint Andrew the Apostle, from whom Bonifacio\'s given name was derived, as he was born on such day.', 
            image: 'https://radyopilipinas.ph/wp-content/uploads/2023/11/IMG-1a0afc349f614f08064596578633d89e-V.jpg' ,
            link:'https://en.wikipedia.org/wiki/Bonifacio_Day'},
        { month: 'December', date: 8, holiday: 'Feast of the Immaculate Conception of Mary', details: 'The Solemnity of the Immaculate Conception celebrates the Immaculate Conception of the Blessed Virgin Mary on 8 December, nine months before the feast of the Nativity of Mary on 8 September. It is one of the most important Marian feasts in the liturgical calendar of the Latin Church.', 
            image: 'https://www.inkaterra.com/blog/wp-content/uploads/2018/12/Full_Inmaculada_cocepcion.jpg' ,
            link:'https://en.wikipedia.org/wiki/Feast_of_the_Immaculate_Conception'},
        { month: 'December', date: 24, holiday: 'Christmas Eve', details: 'Christmas Eve is the evening or entire day before Christmas, the festival commemorating the birth of Jesus. Christmas Day is observed around the world, and Christmas Eve is widely observed as a full or partial holiday in anticipation of Christmas Day. Together, both days are considered one of the most culturally significant celebrations in Christendom and Western society.', 
            image: 'https://blog.halophilippines.co.uk/wp-content/uploads/2023/11/shutterstock_769696636-1024x678.jpg' ,
            link:'https://en.wikipedia.org/wiki/Christmas_Eve'},
        { month: 'December', date: 25, holiday: 'Christmas Day', details: 'Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25 as a religious and cultural celebration among billions of people around the world. A liturgical feast central to Christianity, preparation for Christmas begins on the First Sunday of Advent and it is followed by Christmastide, which historically in the West lasts twelve days and culminates on Twelfth Night. Christmas Day is a public holiday in many countries, is celebrated religiously by a majority of Christians, as well as culturally by many non-Christians, and forms an integral part of the holiday season surrounding it.', 
            image: 'https://gttp.images.tshiftcdn.com/225078/x/0/11-best-philippine-christmas-holiday-destinations-3.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883' ,
            link:'https://en.wikipedia.org/wiki/Christmas'},
        { month: 'December', date: 30, holiday: 'Rizal Day', details: 'Rizal Day (Spanish: Día de Rizal, Filipino: Araw ni Rizal) is a Philippine national holiday commemorating life and works of José Rizal, a national hero of the Philippines. It is celebrated every December 30, the anniversary of Rizal\'s 1896 execution at Bagumbayan (present-day Rizal Park) in Manila.', 
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/119th_Rizal_Day_commemoration.jpg' ,
            link:'https://en.wikipedia.org/wiki/Rizal_Day'},
        { month: 'December', date: 31, holiday: 'Last Day of the Year', details: 'December 31 is the 365th day of the year (366th in leap years) in the Gregorian calendar. It is known by a collection of names including: Saint Sylvester\'s Day, New Year\'s Eve or Old Year\'s Day/Night, as the following day is New Year\'s Day. It is the last day of the year; the following day is January 1, the first day of the following year.', 
            image: 'https://www.isegretidimatilde.com/wp-content/uploads/2017/12/5th-Photo-.jpg' ,
            link:'https://en.wikipedia.org/wiki/December_31'}
    ];


    // Find the holiday matching the month and date from the array
    const holidayData = holidays.find(h => h.month === month && h.date === date);

    if (holidayData) {
        // If a matching holiday is found, update the page content
        document.getElementById('month-text').textContent = `${holidayData.month} Holidays`;
        document.getElementById('holi-text').textContent = holidayData.holiday;
        document.getElementById('holi-details').textContent = holidayData.details;

        document.getElementById('holi-img').src = holidayData.image;
        document.getElementById('blank-month').textContent = holidayData.month;
        document.getElementById('blank-date').textContent = holidayData.date;

        const holidayLink = document.getElementById('holiday-link');
        holidayLink.href = holidayData.link;

    } else {
        // If no holiday matches, set default text
        document.getElementById('month-text').textContent = 'No Month Selected';
        document.getElementById('holi-text').textContent = 'No Holiday Selected';
    }
});

