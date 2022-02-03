from math import floor
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class DefaultPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 10000

    def get_paginated_response(self, data):

        next_page_link = self.get_next_link()
        if next_page_link:
            next_page_link = next_page_link.split('/')[-1]

        previous_page_link = self.get_previous_link()
        if previous_page_link:
            previous_page_link = previous_page_link.split('/')[-1]

        return Response({
            'links': {
                'next': next_page_link,
                'previous': previous_page_link
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data,
        })
