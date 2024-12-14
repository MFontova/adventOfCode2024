#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>  // Para usar tipos enteros más grandes

void filesystemChecksum(const char *input) {
    size_t length = strlen(input);

    // Bloques dinámicos
    int64_t **blocksArray = (int64_t **)malloc(length * sizeof(int64_t *));
    size_t totalSize = 0;

    for (size_t i = 0; i < length; i++) {
        size_t count = input[i] - '0';
        totalSize += count;
        blocksArray[i] = (int64_t *)malloc(count * sizeof(int64_t));

        if (i % 2 == 0) {
            for (size_t j = 0; j < count; j++) {
                blocksArray[i][j] = i / 2;  // Mapeo para números
            }
        } else {
            for (size_t j = 0; j < count; j++) {
                blocksArray[i][j] = -1;  // Mapeo para '.'
            }
        }
    }

    // Flatten blocksArray into joinedBlocksArray
    int64_t *joinedBlocksArray = (int64_t *)malloc(totalSize * sizeof(int64_t));
    size_t pos = 0;
    for (size_t i = 0; i < length; i++) {
        size_t count = input[i] - '0';
        for (size_t j = 0; j < count; j++) {
            joinedBlocksArray[pos++] = blocksArray[i][j];
        }
        free(blocksArray[i]);
    }
    free(blocksArray);

    // Perform the shifting operation
    for (size_t i = 0; i < pos; i++) {
        if (joinedBlocksArray[i] == -1) {
            for (size_t j = pos - 1; j > i; j--) {
                if (joinedBlocksArray[j] != -1) {
                    joinedBlocksArray[i] = joinedBlocksArray[j];
                    joinedBlocksArray[j] = -1;
                    break;
                }
            }
        }
    }

    // Calculate the result
    int64_t result = 0;
    for (size_t i = 0; i < pos; i++) {
        if (joinedBlocksArray[i] != -1) {
            result += joinedBlocksArray[i] * (int64_t)i;
        }
    }

    printf("%lld\n", result);

    free(joinedBlocksArray);
}

int main() {
    const char *fileName = "input.txt";

    FILE *file = fopen(fileName, "r");
    if (file == NULL) {
        perror("Error opening file");
        return EXIT_FAILURE;
    }

    char *input = (char *)malloc(20000 * sizeof(char));  // Buffer grande para manejar 19999 caracteres
    if (fgets(input, 20000, file) == NULL) {
        perror("Error reading file");
        fclose(file);
        free(input);
        return EXIT_FAILURE;
    }

    fclose(file);

    // Remove newline character if present
    size_t len = strlen(input);
    if (len > 0 && input[len - 1] == '\n') {
        input[len - 1] = '\0';
    }

    filesystemChecksum(input);

    free(input);
    return 0;
}
