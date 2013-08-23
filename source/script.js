function addZero(i) {
	return (i<10 ? '0' : '')+i;
}

function utcDate(d) {
	return ''+d.getFullYear()+addZero(d.getUTCMonth())+addZero(d.getUTCDate())+'T'+addZero(d.getUTCHours())+addZero(d.getUTCMinutes())+'00Z';
}

$(function() {
	$(document).on("click", ".tv2gcal-link", function(e) {
		e.preventDefault();
		var $self = $(this).closest('span').find('.info');
          $self.addClass('tv2gcal');
		$.get($self.attr('href'),
			function(data) {
				var $data = $(data);
				var $dateStart = $data.find('.date');
				var $timeStart = $self.closest('.tv-parent').find('.date');
				var datePatt = new RegExp("([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)");
				var timePatt = new RegExp("([0-9]+)[^0-9]+([0-9]+)");
				var dateParts = $dateStart.text().match(datePatt);
				var startTimeParts = $timeStart.text().match(timePatt);
				var dStart = new Date(dateParts[3], dateParts[2], dateParts[1], startTimeParts[1], startTimeParts[2]);
				var $tv = $data.find('.subtitle').contents().eq(2);
				var $timeEnd = $self.closest('.tv-parent').next().find('.date');
				var endTimeParts = $timeEnd.text().match(timePatt);
				var dEnd = new Date(dateParts[3], dateParts[2], dateParts[1], endTimeParts[1], endTimeParts[2]);
				if(dStart > dEnd) dEnd.setDate(dEnd.getDate() + 1);
				window.open('http://www.google.com/calendar/event?action=TEMPLATE&text='+$self.text()+'&dates='+utcDate(dStart)+'/'+utcDate(dEnd)+'&location='+$tv.text()+'&trp=false&sprop=&sprop=name:');
			}
		).fail(function() { $self.removeClass('tv2gcal'); });
	});
});

setInterval(function() {
	// řádkový program
	$("a.info").not('.tv2gcal').each(function() {
		$(this).wrap('<span style="white-space: nowrap;" />');
		$(this).after(' <a class="tv2gcal-link" href="#"><img src="https://calendar.google.com/googlecalendar/images/favicon.ico" width="16" height="16" style="vertical-align: bottom;" /></a>');
          $(this).addClass('tv2gcal');
  	});

	// sloupcový program
	$(".prog h4").not('.tv2csfd').each(function() {
		$(this).eq(0).append(' <a href="http://www.csfd.cz/hledat/?q='+$(this).text()+'" target="_blank"><img src="http://img.csfd.cz/assets/images/favicon.ico" width="16" height="16" style="vertical-align: bottom;" /></a>');
		$(this).addClass('tv2csfd');
	});
}, 2000);