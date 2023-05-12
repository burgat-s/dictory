class BaseDto
{
    constructor (attributes = {})
    {
        this.fill(attributes);
    }

    fill = function(attributes)
    {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key) && this.hasOwnProperty(key) ) {
                this.key = attributes[key];
            };
        }
        return this;
    }

    fillCustom = function(attributes)
    {
        for (let key in this) {
            if (attributes.hasOwnProperty(key) && this.hasOwnProperty(key) ) {
                this[key] = attributes[key];
            } else {
               delete this.key
            }
        }
        return this;
    };

    structure = function(){
        let structure = [];
        for (let key in this) {
            if (attributes.hasOwnProperty(key) && this.hasOwnProperty(key) ) {
                structure.push(key);
            }
        }
        return structure;
    };


    hide = function(attributes = {})
    {
        for (let key in this) {
            if (attributes.find(key) !== undefined && this.hasOwnProperty(key) ) {
                delete this.key
            }
        }
        return this;
    };

    hideNull = function()
    {
        for (let key in this) {
            if (this.key === null && this.hasOwnProperty(key) ) {
                delete this.key
            }
        }
        return this;
    };
}
module.exports = BaseDto;