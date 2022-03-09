import os
import re
import requests
import mimetypes
import vimeo
import urllib.request
import io
from random import random
from urllib import response
from bs4 import BeautifulSoup as soup
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from Constants import VIMEO_API_KEY
from django.http import HttpResponse, JsonResponse
from django.http import StreamingHttpResponse
import redis

VIMEO_PATH = 'https://player.vimeo.com/video'
DOWNLOAD_PATH = 'C:\www\vimeo-pwa\downloads'


class Get_playlist(APIView):

    def get(self, request, format=None):
        try:
            client = vimeo.VimeoClient(
                token=VIMEO_API_KEY,
            )

            res = client.get(
                "https://api.vimeo.com/channels/staffpicks/videos?per_page=10")
            res = res.json()

            # we will get the first video to be displayed, and later on for every click we will fetch the cdn path again(Faster)
            if len(res['data']):
                video_id = res['data'][0]['player_embed_url'].split('?')[
                    0].split('/')[-1]
                res['data'][0]['cdnpath'] = get_cdn_path(video_id)

            return Response(data=res, status=status.HTTP_200_OK)
        except Exception as e:
            raise e


class Get_video_cdn_path(APIView):

    def get(self, request, format=None):
        try:
            res = get_cdn_path(request.GET['videoid'])
            return Response(data=res, status=status.HTTP_200_OK)
        except Exception as e:
            raise e


class Download_file(APIView):

    def get(self, request, format=None):
        return Response(data={}, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        # video_path = get_cdn_path(request.data.get('id'))
        # name = 'someName'

        return Response(data={}, status=status.HTTP_200_OK)


# class Download_video(APIView):
#     def get(self, request, format=None):
#         dowlnload_dir = "c:\\www\\vimeo-pwa\\downloads\\"
#         filename = '3095076256.mp4'
#         filepath = dowlnload_dir + filename
#         path = open(filepath, 'rb')
#         mimeType = mimetypes.guess_type(filepath)

#         response = HttpResponse(path.read(), content_type=mimeType)
#         response['Content-Length'] = os.path.getsize(filepath)
#         response['Content-Disposition'] = \
#             "attachment; filename=\"%s\"; filename*=utf-8''%s" % \
#             (filename, filename)
#         path.close()
#         return response

class Download_video(APIView):
    def get(self, request, format=None):
        r = redis.Redis()
        az = [chr(i) for i in range(ord('a'), ord('z') + 1)]
        # i can guess the format with mimetype but i will keep mp4 for now
        name = ''.join(random.choises(az, k=5)) + '.mp4'
        filename = os.path.join(DOWNLOAD_PATH, name)
        with urllib.request.urlretrieve(cdn_path, filename=filename) as chunk:
            Length = chunk.getheader('content-length')
            BlockSize = 1000000  # default value

            if Length:
                Length = int(Length)
                BlockSize = max(4096, Length // 20)

            print("UrlLib len, blocksize: ", Length, BlockSize)

            BufferAll = io.BytesIO()
            Size = 0
            while True:
                BufferNow = chunk.read(BlockSize)
                if not BufferNow:
                    break
                BufferAll.write(BufferNow)
                Size += len(BufferNow)
                if Length:
                    Percent = int((Size / Length)*100)
                    print(f"download: {Percent}%")
                    r.mset({"progress": Percent})

            print("Buffer All len:", len(BufferAll.getvalue()))

        return Response(data={}, status=status.HTTP_200_OK)


class Get_download_progress(APIView):
    def get(self, request, format=None):
        r = redis.Redis()
        return Response(data={'progress': r.get('progress')}, status=status.HTTP_200_OK)


@staticmethod
def get_cdn_path(link_id):
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
    }

    link = VIMEO_PATH + '/' + str(link_id)

    result = requests.get(link, headers=HEADERS)
    bs = soup(result.content, 'html.parser')

    # we will convert output to str to get url from it
    vod = re.findall(
        ".*\"url\":\"https://vod-progressive(.*)\.mp4\",.*", str(bs))

    file = 'https://vod-progressive' + vod[0] + '.mp4'
    return file
