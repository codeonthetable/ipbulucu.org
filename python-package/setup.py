from setuptools import setup, find_packages

setup(
    name="ipbulucu",
    version="1.0.0",
    description="Official Python SDK for ipbulucu.org - Free IP Geolocation, Whois and Network Intelligence API",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="ipbulucu.org",
    author_email="info@ipbulucu.org",
    url="https://ipbulucu.org",
    packages=find_packages(),
    install_requires=["requests>=2.25.0"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
