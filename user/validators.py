import re

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _

@deconstructible
class UnicodeUsernameValidator(validators.RegexValidator):
    regex = r"^[가-힣a-zA-Z]+$"
    message = _(
        {'message' : '오직 한글과 영어만 가능해요'}
    )
    flags = 0