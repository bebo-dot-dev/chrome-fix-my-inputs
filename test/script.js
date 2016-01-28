if (window.$) {
	$(document).ready(function() {

		var preventPaste = function(e) {
			e.preventDefault();
		};

		document.getElementById('property').onpaste = preventPaste;
		document.getElementById('listener').addEventListener('paste', preventPaste, false);

		$('#byJquery').on('cut', function(e) {
			return false;
		});
		$('#byJquery').on('copy', function(e) {
			return false;
		});
		$('#byJquery').on('paste', function(e) {
			return false;
		});
		$('#byJquery').on('contextmenu', function(e) {
			return false;
		});
		$('#byJquery').on('drag', function(e) {
			return false;
		});
		$('#byJquery').on('drop', function(e) {
			return false;
		});

		$('#dhtmlFormBtn').on('click', function() {
			//dhtml form
			var form = document.createElement('FORM');
			form.name = 'dhtmlForm';

			var tb = document.createElement('INPUT');
			tb.type = 'TEXT';
			tb.id = 'tb1';
			form.appendChild(tb);
			tb.onpaste = preventPaste;

			tb = document.createElement('INPUT');
			tb.type = 'TEXT';
			tb.id = 'tb2';
			form.appendChild(tb);
			tb.addEventListener('paste', preventPaste, false);

			tb = document.createElement('INPUT');
			tb.type = 'TEXT';
			tb.id = 'tb3';
			form.appendChild(tb);

			document.getElementById('injectionSite').appendChild(form);

			$(tb).on('paste', function(e) {
				return false;
			});
		});

	});
}
