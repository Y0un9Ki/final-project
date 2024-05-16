import re

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _

@deconstructible
class UnicodeUsernameValidator(validators.RegexValidator):
    regex = r"^[가-힣]+$"
    message = _('한글 이름으로 작성을 해주세요')
    flags = 0
    
@deconstructible
class UnicodeNumberValidator(validators.RegexValidator):
    regex = r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$'
    message = _('10자리 11자리 전화번호를 입력해주세요')
    flags = 0