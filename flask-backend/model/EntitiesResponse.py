class EntitiesResponse:
    def __init__(self, parsedHtml: str):
        self.parsedHtml = parsedHtml
    
    def setParsedHtml(self, parsedHtml):
        self.parsedHtml = parsedHtml