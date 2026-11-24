"""Offline transport contracts. Run against source or an installed wheel via PYTHONPATH."""
from unittest.mock import patch, Mock
import ipbulucu
import requests

calls = [lambda: ipbulucu.get_ip('2001:db8::1'), lambda: ipbulucu.get_whois('example.test'), lambda: ipbulucu.check_port('example.test', 443)]
for call in calls:
    response = Mock()
    response.json.return_value = {'success': True, 'geoStatus': 'unavailable', 'isVpn': None}
    with patch('requests.get', return_value=response) as get:
        result = call()
        assert result['isVpn'] is None and result['geoStatus'] == 'unavailable'
        assert get.call_args.kwargs['timeout'] == 10
        assert get.call_args.kwargs['headers']['X-IPBulucu-Client'] == 'python-sdk'
        response.raise_for_status.assert_called_once_with()
    response = Mock()
    response.raise_for_status.side_effect = requests.HTTPError('fixture HTTP 429')
    with patch('requests.get', return_value=response) as get:
        try:
            call()
            raise AssertionError('HTTP error ignored')
        except requests.HTTPError:
            pass
        response.json.assert_not_called()
        assert get.call_count == 1
print('PASS 6 Python SDK cases: nullable data, timeout, client label, HTTP failure before JSON, no retries; no network')
response = Mock()
response.json.return_value = {'success':True,'records':{'MX':[]},'statuses':{'MX':'no-record'}}
with patch('requests.get', return_value=response) as get:
    assert ipbulucu.get_dns(' XN--BCHER-KVA.example. ')['records']['MX'] == []
    get.assert_called_once_with('https://ipbulucu.org/api/dns',params={'host':'xn--bcher-kva.example'},timeout=10,headers={'X-IPBulucu-Client':'python-sdk'})
    for invalid in [None, {}, '', '127.0.0.1','::1','localhost','a..org','https://example.com','x.org/','example.123']:
        try:
            ipbulucu.get_dns(invalid)
        except (ValueError, TypeError):
            continue
        raise AssertionError('invalid domain accepted')
    assert get.call_count == 1
response.raise_for_status.side_effect = requests.HTTPError()
with patch('requests.get', return_value=response):
    try:
        ipbulucu.get_dns('example.com')
        raise AssertionError('HTTP error ignored')
    except requests.HTTPError:
        pass
print('PASS DNS arguments, results, client label and HTTP failure')
