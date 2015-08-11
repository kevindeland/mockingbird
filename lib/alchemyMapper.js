


module.exports.mapRelation = function(relation) {
    
    var subject = relation.subject.text;
    var tokens = subject.split(' ');
    
    if (!relation.action)
        return; // no action
    
    var action =  relation.action.lemmatized;
    var actionTokens = action.split(' ');
    action = actionTokens[actionTokens.length - 1];
    
    return {
        subject: subject,
        tokens: tokens
    }
}
