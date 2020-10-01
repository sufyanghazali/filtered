// Object3D.js: remove()

add: function (object) {

    if (arguments.length > 1) {

        for (let i = 0; i < arguments.length; i++) {

            this.add(arguments[i]);

        }

        return this;

    }

    if (object === this) {

        console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
        return this;

    }
 

        console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);

    }

    return this;

},

remove: function (object) {

    if (arguments.length > 1) {

        for (let i = 0; i < arguments.length; i++) {

            this.remove(arguments[i]);

        }

        return this;

    }

    const index = this.children.indexOf(object);

    if (index !== - 1) {

        object.parent = null;
        this.children.splice(index, 1);

        object.dispatchEvent(_removedEvent);

    }

    return this;

}

// BufferedGeometry.js: remove()

merge: function (geometry, offset) {

    if (!(geometry && geometry.isBufferGeometry)) {

        console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry);
        return;

    }

    if (offset === undefined) {

        offset = 0;

        console.warn(
            'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
            + 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
        );

    }

    const attributes = this.attributes;

    for (const key in attributes) {

        if (geometry.attributes[key] === undefined) continue;

        const attribute1 = attributes[key];
        const attributeArray1 = attribute1.array;

        const attribute2 = geometry.attributes[key];
        const attributeArray2 = attribute2.array;

        const attributeOffset = attribute2.itemSize * offset;
        const length = Math.min(attributeArray2.length, attributeArray1.length - attributeOffset);

        for (let i = 0, j = attributeOffset; i < length; i++, j++) {

            attributeArray1[j] = attributeArray2[i];

        }

    }

    return this;

}