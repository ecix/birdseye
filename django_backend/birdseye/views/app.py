

from django.http import HttpResponse

def show(request):
    """ Render Client Markup """
    with open('birdseye/static/app/index.html', 'r') as f:
        # Read page, fix links
        content = f.read()
        content = content.replace('js/', '/static/app/build/js/')
        content = content.replace('css/', '/static/app/build/css/')
        return HttpResponse(content)


